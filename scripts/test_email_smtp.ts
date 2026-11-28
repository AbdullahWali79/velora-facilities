import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

// Load .env.local and hostinger.env if present
for (const envFile of ['.env.local', 'hostinger.env']) {
  const fullPath = path.resolve(process.cwd(), envFile)
  if (fs.existsSync(fullPath)) {
    const lines = fs.readFileSync(fullPath, 'utf-8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=')
        const val = v.join('=').trim().replace(/^["']|["']$/g, '')
        if (k.trim() && !process.env[k.trim()]) {
          process.env[k.trim()] = val
        }
      }
    }
  }
}

async function runSmtpDiagnostic() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com'
  const port = Number(process.env.SMTP_PORT) || 465
  const user = process.env.SMTP_USER || 'info@veloraelite.ae'
  const pass = process.env.SMTP_PASS
  const targetEmail = process.argv[2] || process.env.ADMIN_NOTIFICATION_EMAIL || 'info@veloraelite.ae'

  console.log('====================================================================')
  console.log('       VELORA ELITE — HOSTINGER SMTP DIAGNOSTIC SUITE               ')
  console.log('====================================================================')
  console.log(`SMTP Host:     ${host}`)
  console.log(`SMTP Port:     ${port}`)
  console.log(`SMTP User:     ${user}`)
  console.log(`SMTP Password: ${pass ? '******** (configured)' : 'MISSING / EMPTY'}`)
  console.log(`Target Email:  ${targetEmail}`)
  console.log('--------------------------------------------------------------------')

  if (!pass) {
    console.error('❌ ERROR: SMTP_PASS is not configured in your environment variables!')
    console.error('To fix this on your Hostinger server or local environment:')
    console.error('1. Create or open .env.local (or set environment variables on your server)')
    console.error('2. Add: SMTP_PASS=YourHostingerMailboxPassword')
    console.error('3. Ensure SMTP_USER=info@veloraelite.ae and SMTP_HOST=smtp.hostinger.com')
    process.exit(1)
  }

  const isPort465 = port === 465
  const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : isPort465

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })

  console.log('1. Connecting to Hostinger SMTP and verifying credentials...')
  try {
    await transporter.verify()
    console.log('✅ Connection and credentials verified successfully!')
  } catch (err: unknown) {
    const error = err as Error
    console.error('❌ SMTP Verification failed:', error.message)
    process.exit(1)
  }

  console.log(`2. Dispatching test confirmation email to: ${targetEmail}...`)
  try {
    const info = await transporter.sendMail({
      from: `"Velora Elite Concierge" <${user}>`,
      to: targetEmail,
      replyTo: user,
      subject: 'Velora Elite — Booking & SMTP System Verification [PASS]',
      text: `Dear Client,\n\nThis is a verification email confirming that the Velora Elite automated email notification system is functioning flawlessly with Hostinger SMTP (${host}:${port}).\n\nAll booking requests, quotations, and customer confirmations are delivered with high priority.\n\nWarm regards,\nVelora Elite Technical Services L.L.C.\nAspin Commercial Tower, Sheikh Zayed Road, Dubai`,
      html: `
        <div style="background-color: #0b0f17; color: #f8fafc; font-family: sans-serif; padding: 32px; border-radius: 12px; border: 1px solid #DFB76C; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DFB76C; margin-top: 0;">VELORA ELITE DUBAI</h2>
          <p style="font-size: 16px; color: #ffffff;">SMTP Email Delivery System Verification: <strong>PASSED</strong></p>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            This email confirms that your Hostinger mail server (<strong>${host}</strong>) is actively delivering automated booking confirmations and inquiry alerts to customers and company mailboxes.
          </p>
          <hr style="border: 0; border-top: 1px solid rgba(223, 183, 108, 0.3); margin: 24px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">
            Velora Elite Technical Services L.L.C. &bull; Office 4301F, Aspin Commercial Tower, Sheikh Zayed Road, Dubai, UAE
          </p>
        </div>
      `,
    })
    console.log(`✅ Test email delivered successfully! MessageId: ${info.messageId}`)
    console.log('====================================================================')
  } catch (sendErr: unknown) {
    const error = sendErr as Error
    console.error('❌ Failed to dispatch test email:', error.message)
  }
}

runSmtpDiagnostic()
