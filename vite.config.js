import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function resendDevPlugin() {
  return {
    name: 'resend-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/send', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}')
            const env = loadEnv(server.config.mode || 'development', process.cwd(), '')
            const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY

            if (!apiKey) {
              // Graceful mock success with helpful console note if API key not set yet
              console.warn('[Resend Dev] RESEND_API_KEY not set in .env. Simulating successful submission.')
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(JSON.stringify({ success: true, mocked: true, message: 'Enquiry received (Simulated in local dev without RESEND_API_KEY).' }))
              return
            }

            const resend = new Resend(apiKey)
            const { firstName, lastName, email, company, project, message } = data
            const fullName = `${firstName || ''} ${lastName || ''}`.trim()
            const projectLabel = project === 'vaidic-village' ? 'Vaidic Village' : (project || 'General Inquiry')
            const toEmail = env.CONTACT_RECEIVER_EMAIL || 'info@diarchhomes.com'
            const fromEmail = env.RESEND_FROM_EMAIL || 'Diarch Homes Enquiries <onboarding@resend.dev>'

            const htmlContent = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background: #0b1320; color: #f4eedb; border: 1px solid #c9a96e; border-radius: 8px;">
                <h2 style="color: #c9a96e; border-bottom: 1px solid rgba(201,169,110,0.3); padding-bottom: 8px;">New Site Visit / Project Enquiry</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#c9a96e">${email}</a></p>
                <p><strong>Organization:</strong> ${company || 'N/A'}</p>
                <p><strong>Inquiry / Project:</strong> ${projectLabel}</p>
                <p><strong>Message:</strong><br/>${message || 'No additional message provided.'}</p>
              </div>
            `

            const result = await resend.emails.send({
              from: fromEmail,
              to: [toEmail],
              replyTo: email,
              subject: `New Enquiry from ${fullName} - ${projectLabel}`,
              html: htmlContent,
            })

            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, result }))
          } catch (err) {
            console.error('[Resend Dev Error]', err)
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message || 'Failed to dispatch email' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), resendDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
