'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

interface SessionData {
  templateName: string
  downloadUrl: string | null
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError('No session found')
      setLoading(false)
      return
    }

    // Fetch session details from our API
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout/session?sessionId=${sessionId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch session')
        }
        const data = await response.json()
        setSessionData({
          templateName: data.metadata?.templateName || 'Your Template',
          downloadUrl: data.metadata?.downloadUrl || null,
        })
      } catch (err) {
        console.error('Error fetching session:', err)
        setError('Could not retrieve download information')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for purchasing <span className="font-semibold text-gray-800">{sessionData?.templateName}</span>
        </p>

        {sessionData?.downloadUrl && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-2 border-green-400">
            <p className="text-gray-600 mb-4">Your template is ready to download:</p>
            <a
              href={sessionData.downloadUrl}
              download={`${sessionData.templateName}.zip`}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 inline-block"
            >
              Download Template (ZIP)
            </a>
            <p className="text-xs text-gray-500 mt-3">
              This link expires in 24 hours. Download now if you haven't already.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        <p className="text-gray-600 mb-8">
          A confirmation email with download details has been sent to your inbox.
        </p>

        <div className="space-x-4">
          <Link
            href="/"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 inline-block"
          >
            Back to Gallery
          </Link>
          <Link
            href="/admin"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 inline-block"
          >
            View Stats
          </Link>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  )
}
