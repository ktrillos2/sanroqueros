import { createClient } from '@libsql/client'

export function getTursoClient() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!url || !authToken) {
    throw new Error('TURSO_DATABASE_URL y TURSO_AUTH_TOKEN son requeridos en las variables de entorno.')
  }
  return createClient({ url, authToken })
}

export interface SurveyRecord {
  tutorName: string
  petName: string
  phone: string
  email?: string
  service: string
  serviceOther?: string
  ratingGeneral: number
  ratingResult: number
  ratingStaff: number
  likedMost?: string
  improvements?: string
  nps: number
  returnVisit: string
  authorizeTestimonial: string
}

export async function saveSurvey(data: SurveyRecord) {
  const client = getTursoClient()
  const now = new Date().toISOString()
  const result = await client.execute({
    sql: `
      INSERT INTO surveys (
        tutor_name,
        pet_name,
        phone,
        email,
        service,
        service_other,
        rating_general,
        rating_result,
        rating_staff,
        liked_most,
        improvements,
        nps,
        return_visit,
        authorize_testimonial,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      data.tutorName || '',
      data.petName || '',
      data.phone || '',
      data.email || '',
      data.service || '',
      data.serviceOther || '',
      Number(data.ratingGeneral) || 5,
      Number(data.ratingResult) || 5,
      Number(data.ratingStaff) || 5,
      data.likedMost || '',
      data.improvements || '',
      Number(data.nps) || 10,
      data.returnVisit || '',
      data.authorizeTestimonial || '',
      now,
      now,
    ],
  })
  return result
}

export async function getSurveys(limit = 100) {
  const client = getTursoClient()
  const result = await client.execute({
    sql: `SELECT * FROM surveys ORDER BY id DESC LIMIT ?`,
    args: [limit],
  })
  return result.rows
}
