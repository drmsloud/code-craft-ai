import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export interface EmailDeliveryProps {
  email: string
  templateName: string
  downloadUrl: string
  expiresIn: string // e.g., "24 hours"
}

/**
 * Send template delivery email to customer
 */
export async function sendDeliveryEmail({
  email,
  templateName,
  downloadUrl,
  expiresIn = '24 hours',
}: EmailDeliveryProps): Promise<void> {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@code-craft-ai.com',
      subject: `🎉 Your ${templateName} Template is Ready!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
              .header { text-align: center; margin-bottom: 30px; }
              .button { 
                display: inline-block; 
                background-color: #4f46e5; 
                color: white; 
                padding: 12px 30px; 
                border-radius: 5px; 
                text-decoration: none; 
                font-weight: bold;
                margin: 20px 0;
              }
              .footer { 
                text-align: center; 
                margin-top: 40px; 
                font-size: 12px; 
                color: #999; 
              }
              .warning {
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                color: #d97706;
                padding: 12px;
                border-radius: 4px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="color: #333; margin: 0;">🎉 Your Template is Ready!</h1>
              </div>
              
              <p style="font-size: 16px; color: #555;">Hi there,</p>
              
              <p style="font-size: 16px; color: #555;">
                Thank you for purchasing <strong>${templateName}</strong> from Code Craft AI!
              </p>
              
              <p style="font-size: 16px; color: #555;">
                Your download link is ready and valid for <strong>${expiresIn}</strong>:
              </p>
              
              <div style="text-align: center;">
                <a href="${downloadUrl}" class="button">
                  ⬇️ Download Your Template
                </a>
              </div>
              
              <div class="warning">
                <strong>⚠️ Important:</strong> This link expires in ${expiresIn}. Download now to be safe!
              </div>
              
              <h3 style="color: #333;">What's Inside:</h3>
              <ul style="color: #555;">
                <li>✅ Production-ready source code</li>
                <li>✅ Complete setup instructions (README)</li>
                <li>✅ Environment configuration (.env.example)</li>
                <li>✅ Dependencies & package files</li>
                <li>✅ MIT License</li>
              </ul>
              
              <h3 style="color: #333;">Quick Start:</h3>
              <ol style="color: #555;">
                <li>Download the .zip file above</li>
                <li>Extract to your project folder</li>
                <li>Follow the README.md instructions</li>
                <li>Run setup commands (usually <code>npm install</code> or <code>pip install</code>)</li>
                <li>Start building!</li>
              </ol>
              
              <p style="color: #666; margin-top: 30px;">
                Questions? Need help? Reply to this email or visit our site:
              </p>
              
              <p style="text-align: center;">
                <a href="https://code-craft-ai.vercel.app" style="color: #4f46e5; text-decoration: none;">code-craft-ai.vercel.app</a>
              </p>
              
              <div class="footer">
                <p style="margin: 0;">Code Craft AI © 2026</p>
                <p style="margin: 0;">Building templates for builders 🚀</p>
                <p style="margin: 0;">You received this email because you purchased a template.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Your ${templateName} template is ready for download!\n\nClick here to download: ${downloadUrl}\n\nLink expires in ${expiresIn}.\n\nCode Craft AI`,
    }

    await sgMail.send(msg)
    console.log(`Delivery email sent to ${email}`)
  } catch (error) {
    console.error('SendGrid error:', error)
    throw error
  }
}

/**
 * Send confirmation email after Stripe webhook
 */
export async function sendOrderConfirmationEmail({
  email,
  templateName,
  orderId,
}: {
  email: string
  templateName: string
  orderId: string
}): Promise<void> {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@code-craft-ai.com',
      subject: `Order Confirmation - ${templateName}`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <h2>Order Confirmed ✓</h2>
          <p>Your purchase has been confirmed. Order ID: <code>${orderId}</code></p>
          <p>Your download link is being prepared and will be sent shortly.</p>
          <p style="color: #999; font-size: 12px;">Code Craft AI</p>
        </div>
      `,
    }

    await sgMail.send(msg)
    console.log(`Confirmation email sent to ${email}`)
  } catch (error) {
    console.error('SendGrid confirmation email error:', error)
    // Don't throw - order is already created
  }
}
