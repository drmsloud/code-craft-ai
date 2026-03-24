import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder, updateOrderWithDownloadUrl } from '@/lib/dynamodb'
import { sendDeliveryEmail, sendOrderConfirmationEmail } from '@/lib/sendgrid'
import { generateDownloadLink, getDownloadLinkExpiry } from '@/lib/s3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const templateId = session.metadata?.templateId
      const templateName = session.metadata?.templateName
      const email = session.customer_email

      if (!templateId || !templateName || !email) {
        console.error('Missing metadata in checkout session', session)
        return NextResponse.json(
          { error: 'Missing metadata' },
          { status: 400 }
        )
      }

      try {
        // Create order record
        const orderId = session.id
        await createOrder({
          orderId,
          email,
          templateId,
          templateName,
          amount: Math.round((session.amount_total || 0) / 100), // Convert cents to dollars
          status: 'pending',
          createdAt: new Date().toISOString(),
        })

        // Send confirmation email
        await sendOrderConfirmationEmail({
          email,
          templateName,
          orderId,
        })

        // Generate download link
        const downloadUrl = await generateDownloadLink(templateId)
        const expiresAt = getDownloadLinkExpiry()

        // Update order with download URL
        await updateOrderWithDownloadUrl(orderId, downloadUrl, expiresAt)

        // Send delivery email with download link
        await sendDeliveryEmail({
          email,
          templateName,
          downloadUrl,
          expiresIn: '24 hours',
        })

        console.log(`Order completed and delivered: ${orderId}`)
      } catch (error) {
        console.error('Error processing order:', error)
        // Don't return error - Stripe will retry. Just log it.
      }
    }

    // Handle payment failures
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error(`Payment failed for customer: ${paymentIntent.customer}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing error' },
      { status: 500 }
    )
  }
}
