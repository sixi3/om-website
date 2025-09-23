'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WealthManagementRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/moneyone/solutions/wealth-management')
  }, [router])
  
  return <div>Redirecting...</div>
}