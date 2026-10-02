import { NextRequest, NextResponse } from 'next/server'
import { saveSurvey, getSurveys, SurveyRecord } from '@/lib/surveys-db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validaciones básicas requeridas
    if (!body.tutorName?.trim() || !body.petName?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Nombre del tutor, nombre de la mascota y teléfono son obligatorios.' },
        { status: 400 }
      )
    }

    const record: SurveyRecord = {
      tutorName: String(body.tutorName).trim(),
      petName: String(body.petName).trim(),
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : '',
      service: body.service ? String(body.service).trim() : '',
      serviceOther: body.serviceOther ? String(body.serviceOther).trim() : '',
      ratingGeneral: Number(body.ratingGeneral) || 5,
      ratingResult: Number(body.ratingResult) || 5,
      ratingStaff: Number(body.ratingStaff) || 5,
      likedMost: body.likedMost ? String(body.likedMost).trim() : '',
      improvements: body.improvements ? String(body.improvements).trim() : '',
      nps: Number(body.nps) || 10,
      returnVisit: body.returnVisit ? String(body.returnVisit).trim() : 'Sí, definitivamente',
      authorizeTestimonial: body.authorizeTestimonial ? String(body.authorizeTestimonial).trim() : 'No',
    }

    const result = await saveSurvey(record)

    return NextResponse.json({
      ok: true,
      message: 'Encuesta guardada con éxito',
      id: result.lastInsertRowid ? String(result.lastInsertRowid) : undefined,
    })
  } catch (error: any) {
    console.error('Error al guardar la encuesta:', error)
    return NextResponse.json(
      { ok: false, error: 'Hubo un error al guardar tu encuesta. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const rows = await getSurveys(100)
    return NextResponse.json({ ok: true, surveys: rows })
  } catch (error: any) {
    console.error('Error al obtener encuestas:', error)
    return NextResponse.json(
      { ok: false, error: 'Error al consultar encuestas' },
      { status: 500 }
    )
  }
}
