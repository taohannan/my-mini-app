'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
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
    <main style={{ padding: '2rem' }}>
      <h1>🎉 Mini App (Next.js)</h1>
      {token ? (
        <>
          <p><strong>Raw Token:</strong> {token}</p>
          <h2>🔍 Decoded Token Payload</h2>
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
    </main>
  )
}
