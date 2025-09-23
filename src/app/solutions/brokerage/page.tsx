'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BrokerageRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/moneyone/solutions/brokerage')
  }, [router])
  
  return <div>Redirecting...</div>
}