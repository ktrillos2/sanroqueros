import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendSurveyNotification } from '@/lib/mailer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validaciones básicas
    if (!body.tutorName?.trim() || !body.petName?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Nombre del tutor, nombre de la mascota y teléfono son obligatorios.' },
        { status: 400 }
      )
    }

    const surveyData = {
      tutorName: String(body.tutorName).trim(),
      petName: String(body.petName).trim(),
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : undefined,
      service: body.service ? String(body.service).trim() : '',
      serviceOther: body.serviceOther ? String(body.serviceOther).trim() : undefined,
      ratingGeneral: Number(body.ratingGeneral) || 5,
      ratingResult: Number(body.ratingResult) || 5,
      ratingStaff: Number(body.ratingStaff) || 5,
      likedMost: body.likedMost ? String(body.likedMost).trim() : undefined,
      improvements: body.improvements ? String(body.improvements).trim() : undefined,
      nps: Number(body.nps) || 10,
      returnVisit: body.returnVisit ? String(body.returnVisit).trim() : 'Sí, definitivamente',
      authorizeTestimonial: body.authorizeTestimonial ? String(body.authorizeTestimonial).trim() : 'No',
    }

    // 1. Guardar en Payload CMS (panel de administrador)
    const payload = await getPayload({ config })
    const created = await payload.create({
      collection: 'surveys' as any,
      data: surveyData as any,
      overrideAccess: true,
    })

    // 2. Enviar notificación por correo (no-blocking: si falla, no afecta la respuesta)
    sendSurveyNotification({
      ...surveyData,
      email: surveyData.email || '',
      serviceOther: surveyData.serviceOther || '',
      likedMost: surveyData.likedMost || '',
      improvements: surveyData.improvements || '',
    }).catch((err) => {
      console.error('[mailer] Error enviando correo de encuesta:', err)
    })

    return NextResponse.json({
      ok: true,
      message: 'Encuesta guardada con éxito. ¡Gracias por tu opinión!',
      id: String(created.id),
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[survey/POST] Error al guardar la encuesta:', message)
    return NextResponse.json(
      { ok: false, error: 'Hubo un error al guardar tu encuesta. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'surveys' as any,
      limit: 200,
      sort: '-createdAt',
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, surveys: result.docs, total: result.totalDocs })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[survey/GET] Error al obtener encuestas:', message)
    return NextResponse.json(
      { ok: false, error: 'Error al consultar encuestas' },
      { status: 500 }
    )
  }
}
