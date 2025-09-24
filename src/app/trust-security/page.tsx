'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TrustSecurityRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/moneyone/trust-security')
  }, [router])
  
  return <div>Redirecting...</div>
}