'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function TokenViewer() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [decoded, setDecoded] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    if (token) {
      try {
        const payload = token.split('.')[1]
        const json = JSON.parse(atob(payload))
        setDecoded(json)
      } catch (e) {
        console.error('Failed to decode token:', e)
        setDecoded({ error: 'Invalid token' })
      }
    }
  }, [token])

  return (
    <>
      <h2>🎉 Mini App (Next.js)</h2>
      {token ? (
        <>
          <p><strong>Raw Token:</strong> {token}</p>
          <h3>🔍 Decoded Token Payload</h3>
          <ul>
            {decoded &&
              Object.entries(decoded).map(([key, value]) => (
                <li key={key}><strong>{key}</strong>: {String(value)}</li>
              ))}
          </ul>
        </>
      ) : (
        <p>Waiting for token...</p>
      )}
    </>
  )
}

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <Suspense fallback={<p>Loading...</p>}>
        <TokenViewer />
      </Suspense>
    </main>
  )
}
