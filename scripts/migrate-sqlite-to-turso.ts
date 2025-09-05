import Database from 'better-sqlite3'
import { createClient } from '@libsql/client'

// Este script copia datos desde un archivo local payload.sqlite a una DB remota Turso/libSQL.
// Requisitos:
// - Tener el archivo ./payload.sqlite presente en la raíz del repo.
// - Definir TURSO_DATABASE_URL y TURSO_AUTH_TOKEN en el entorno.
// Uso:
//  1) Ejecuta primero init-remote-schema para garantizar que existan tablas.
//  2) Ejecuta este script para migrar datos tabla por tabla.

const LOCAL_DB_PATH = './payload.sqlite'

async function main() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!url || !authToken) {
    console.error('Faltan variables TURSO_DATABASE_URL o TURSO_AUTH_TOKEN')
    process.exit(1)
  }

  const remote = createClient({ url, authToken })
  const local = new Database(LOCAL_DB_PATH, { readonly: true })

  // Lee el listado de tablas de SQLite local
  const tables = local.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
  `).all().map((r: any) => r.name) as string[]

  console.log('Tablas locales:', tables)

  // Deshabilitar transacciones anidadas si la lib no soporta; haremos por tabla
  for (const table of tables) {
    // Leer todas las filas
    const rows = local.prepare(`SELECT * FROM "${table}"`).all()
    if (!rows.length) { console.log(`Tabla ${table}: 0 filas, saltando`); continue }

    console.log(`Migrando ${rows.length} filas de ${table}…`)

    // Construye un insert dinámico con REPLACE para idempotencia por PK
    const cols = Object.keys(rows[0])
    const placeholders = cols.map(() => '?').join(', ')
    const insertSql = `INSERT OR REPLACE INTO "${table}" (${cols.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`

    for (const row of rows) {
      const values = cols.map(c => (row as any)[c])
      try {
        await remote.execute({ sql: insertSql, args: values as any })
      } catch (e:any) {
        console.error(`Fallo insert en ${table}:`, e?.message || e)
      }
    }
  }

  console.log('Migración completada')
}

main().then(() => process.exit(0))
