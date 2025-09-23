'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdvisoryRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/moneyone/solutions/advisory')
  }, [router])
  
  return <div>Redirecting...</div>
}