import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { templates } from '@/lib/templates'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { templateId, templateName, amount, email } = await request.json()

    if (!email || !amount || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the template and get its download URL
    const template = templates.find(t => t.id === templateId)
    const downloadUrl = template?.downloadUrl || null

    // Get app URL with fallback for Vercel
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${request.headers.get('host')}`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: templateName,
              description: `Download code template: ${templateName}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`,
      metadata: {
        templateId,
        templateName,
        downloadUrl: downloadUrl || '',
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      downloadUrl: downloadUrl,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
