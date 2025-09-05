/*
  Migra datos desde ./payload.sqlite (local) hacia Turso/libSQL (remoto).
  - Crea el esquema remoto a partir de sqlite_master del archivo local.
  - Inserta/actualiza todas las filas por tabla (INSERT OR REPLACE).
  Requisitos:
    - Variables de entorno: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
    - Archivo ./payload.sqlite presente en la raíz del repo.
  Uso:
    npm run db:migrate:sqlite-to-turso
*/

const Database = require('better-sqlite3')
const { createClient } = require('@libsql/client')
const fs = require('fs')
const path = require('path')

const LOCAL_DB_PATH = './payload.sqlite'

function tryReadFromPayloadConfig() {
  try {
    const p = path.resolve(process.cwd(), 'payload.config.ts')
    const txt = fs.readFileSync(p, 'utf8')
    const urlMatch = txt.match(/url:\s*['"](libsql:[^'"\n]+)['"]/)
    const tokenMatch = txt.match(/authToken:\s*['"]([^'"\n]+)['"]/)
    const url = urlMatch?.[1]
    const authToken = tokenMatch?.[1]
    if (url && authToken) return { url, authToken }
  } catch {}
  return null
}

async function ensureEnv() {
  let url = process.env.TURSO_DATABASE_URL
  let authToken = process.env.TURSO_AUTH_TOKEN
  if (!url || !authToken) {
    const fromCfg = tryReadFromPayloadConfig()
    if (fromCfg) return fromCfg
  }
  if (!url || !authToken) {
    throw new Error('Faltan TURSO_DATABASE_URL o TURSO_AUTH_TOKEN (ni se pudieron leer de payload.config.ts)')
  }
  return { url, authToken }
}

function readLocalObjects(local) {
  const rows = local
    .prepare(
      `SELECT name, type, sql FROM sqlite_master
       WHERE type IN ('table','index','trigger')
         AND name NOT LIKE 'sqlite_%'
       ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1 ELSE 2 END, name`
    )
    .all()
  return rows
}

function normalizeCreateSql(obj) {
  if (!obj.sql) return null
  let sql = String(obj.sql)
  if (/^CREATE\s+TABLE(?!\s+IF\s+NOT\s+EXISTS)/i.test(sql)) {
    sql = sql.replace(/^CREATE\s+TABLE/i, 'CREATE TABLE IF NOT EXISTS')
  }
  if (/^CREATE\s+UNIQUE\s+INDEX(?!\s+IF\s+NOT\s+EXISTS)/i.test(sql)) {
    sql = sql.replace(/^CREATE\s+UNIQUE\s+INDEX/i, 'CREATE UNIQUE INDEX IF NOT EXISTS')
  }
  if (/^CREATE\s+INDEX(?!\s+IF\s+NOT\s+EXISTS)/i.test(sql)) {
    sql = sql.replace(/^CREATE\s+INDEX/i, 'CREATE INDEX IF NOT EXISTS')
  }
  // Nota: SQLite no soporta IF NOT EXISTS para TRIGGER; omitimos triggers por seguridad.
  if (/^CREATE\s+TRIGGER/i.test(sql)) return null
  return sql
}

async function createRemoteSchema(remote, objects) {
  for (const obj of objects) {
    if (obj.type !== 'table' && obj.type !== 'index') continue
    const sql = normalizeCreateSql(obj)
    if (!sql) continue
    try {
      await remote.execute(sql)
      // console.log(`Creado/ok: ${obj.type} ${obj.name}`)
    } catch (e) {
      console.warn(`No se pudo crear ${obj.type} ${obj.name}:`, e.message || e)
    }
  }
}

function getTableList(local) {
  const rows = local
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
    )
    .all()
  return rows.map((r) => r.name)
}

function getTableColumns(local, table) {
  const rows = local.prepare(`PRAGMA table_info("${table}")`).all()
  return rows.map((r) => r.name)
}

async function copyTable(remote, local, table) {
  // Evitar tablas internas comunes
  if (table === 'sqlite_sequence') return
  const cols = getTableColumns(local, table)
  if (!cols.length) return
  const rows = local.prepare(`SELECT * FROM "${table}"`).all()
  if (!rows.length) return

  const placeholders = cols.map(() => '?').join(', ')
  const sql = `INSERT OR REPLACE INTO "${table}" (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${placeholders})`
  for (const row of rows) {
    const vals = cols.map((c) => row[c])
    try {
      await remote.execute({ sql, args: vals })
    } catch (e) {
      console.warn(`Error insertando en ${table}:`, e.message || e)
    }
  }
  console.log(`Tabla ${table}: ${rows.length} filas migradas`)
}

async function main() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    throw new Error(`No se encontró ${LOCAL_DB_PATH}. Asegúrate de ejecutar esto en tu entorno local con el archivo presente.`)
  }
  const { url, authToken } = await ensureEnv()
  const remote = createClient({ url, authToken })
  const local = new Database(LOCAL_DB_PATH, { readonly: true })

  console.log('Leyendo esquema local…')
  const objects = readLocalObjects(local)
  console.log(`Objetos locales: ${objects.length}`)

  console.log('Creando esquema remoto (idempotente)…')
  await createRemoteSchema(remote, objects)

  console.log('Copiando tablas…')
  const tables = getTableList(local)
  const priority = new Set(['media', 'posts', 'users'])
  const phase1 = tables.filter((t) => priority.has(t))
  const phase2 = tables.filter((t) => !priority.has(t))
  for (const table of phase1) await copyTable(remote, local, table)
  for (const table of phase2) await copyTable(remote, local, table)
  // Reintento de tablas que pueden depender de posts/media
  const dependent = ['blog_page', 'blog_page_mentions']
  for (const table of dependent) if (tables.includes(table)) await copyTable(remote, local, table)

  console.log('Migración completada.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
