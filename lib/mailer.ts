import nodemailer from 'nodemailer'

interface SurveyEmailData {
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

function getRatingEmoji(rating: number): string {
  if (rating >= 5) return '⭐⭐⭐⭐⭐'
  if (rating >= 4) return '⭐⭐⭐⭐'
  if (rating >= 3) return '⭐⭐⭐'
  if (rating >= 2) return '⭐⭐'
  return '⭐'
}

function getNpsEmoji(nps: number): string {
  if (nps >= 9) return '🟢 Promotor'
  if (nps >= 7) return '🟡 Neutro'
  return '🔴 Detractor'
}

export async function sendSurveyNotification(data: SurveyEmailData): Promise<void> {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const notifyEmail = process.env.SURVEY_NOTIFY_EMAIL || 'info@sanroqueros.com'

  // Si no hay credenciales SMTP, loguear pero no fallar el flujo
  if (!smtpUser || !smtpPass || smtpPass === 'TU_CONTRASEÑA_DE_APLICACION_GMAIL') {
    console.warn('[mailer] SMTP no configurado. Email de encuesta no enviado.')
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const submittedAt = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center; }
    .header h1 { color: #F5C842; margin: 0 0 6px; font-size: 22px; letter-spacing: 1px; }
    .header p { color: #aaa; margin: 0; font-size: 13px; }
    .body { padding: 28px 24px; }
    .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #888; margin: 20px 0 10px; }
    .info-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { color: #555; font-size: 13px; }
    .info-value { color: #111; font-size: 13px; font-weight: 600; text-align: right; max-width: 60%; }
    .rating-bar { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #f0f0f0; }
    .rating-label { color: #555; font-size: 13px; flex: 1; }
    .rating-stars { font-size: 14px; }
    .comment-block { background: #f9f9f9; border-left: 3px solid #F5C842; padding: 12px 16px; border-radius: 0 6px 6px 0; margin: 8px 0; font-size: 13px; color: #333; line-height: 1.6; }
    .nps-badge { display: inline-block; background: #f0f0f0; border-radius: 20px; padding: 4px 14px; font-weight: bold; font-size: 14px; margin-top: 4px; }
    .footer { background: #1a1a1a; padding: 18px 24px; text-align: center; }
    .footer p { color: #666; font-size: 11px; margin: 0; }
    .tag { display: inline-block; background: #F5C842; color: #111; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px; text-transform: uppercase; margin-left: 6px; vertical-align: middle; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🐾 SANROQUE — Nueva Encuesta</h1>
      <p>${submittedAt}</p>
    </div>
    <div class="body">
      <div class="section-title">Datos del cliente</div>
      <div class="info-row"><span class="info-label">Tutor/a</span><span class="info-value">${data.tutorName}</span></div>
      <div class="info-row"><span class="info-label">Mascota</span><span class="info-value">${data.petName}</span></div>
      <div class="info-row"><span class="info-label">Teléfono</span><span class="info-value">${data.phone}</span></div>
      ${data.email ? `<div class="info-row"><span class="info-label">Correo</span><span class="info-value">${data.email}</span></div>` : ''}
      <div class="info-row">
        <span class="info-label">Servicio</span>
        <span class="info-value">${data.service}${data.serviceOther ? ` — ${data.serviceOther}` : ''}</span>
      </div>

      <div class="section-title">Calificaciones</div>
      <div class="rating-bar">
        <span class="rating-label">Experiencia general</span>
        <span class="rating-stars">${getRatingEmoji(data.ratingGeneral)} (${data.ratingGeneral}/5)</span>
      </div>
      <div class="rating-bar">
        <span class="rating-label">Resultado del servicio</span>
        <span class="rating-stars">${getRatingEmoji(data.ratingResult)} (${data.ratingResult}/5)</span>
      </div>
      <div class="rating-bar">
        <span class="rating-label">Atención del equipo</span>
        <span class="rating-stars">${getRatingEmoji(data.ratingStaff)} (${data.ratingStaff}/5)</span>
      </div>

      <div class="section-title">Retroalimentación</div>
      ${data.likedMost ? `<p style="margin:4px 0 6px;font-size:12px;color:#888;">Lo que más le gustó:</p><div class="comment-block">${data.likedMost}</div>` : ''}
      ${data.improvements ? `<p style="margin:12px 0 6px;font-size:12px;color:#888;">Oportunidades de mejora:</p><div class="comment-block">${data.improvements}</div>` : ''}

      <div class="section-title">NPS y fidelización</div>
      <div class="info-row">
        <span class="info-label">Recomendaría SANROQUE (NPS)</span>
        <span class="info-value"><span class="nps-badge">${data.nps}/10</span> ${getNpsEmoji(data.nps)}</span>
      </div>
      <div class="info-row"><span class="info-label">¿Volvería a visitarnos?</span><span class="info-value">${data.returnVisit}</span></div>
      <div class="info-row">
        <span class="info-label">Autoriza testimonio</span>
        <span class="info-value">${data.authorizeTestimonial}${data.authorizeTestimonial === 'Sí' ? '<span class="tag">✓ Publicable</span>' : ''}</span>
      </div>
    </div>
    <div class="footer">
      <p>Encuesta recibida desde <strong>sanroquetupetspa.com/encuesta</strong> · Accede al panel en <strong>/admin</strong></p>
    </div>
  </div>
</body>
</html>
`

  await transporter.sendMail({
    from: `"SANROQUE Encuestas" <${smtpUser}>`,
    to: notifyEmail,
    subject: `🐾 Nueva encuesta: ${data.tutorName} (${data.petName}) — ${data.ratingGeneral}/5 ⭐`,
    html: htmlBody,
    text: `Nueva encuesta de ${data.tutorName} | Mascota: ${data.petName} | Tel: ${data.phone} | Servicio: ${data.service} | Rating: ${data.ratingGeneral}/5 | NPS: ${data.nps}/10`,
  })
}
