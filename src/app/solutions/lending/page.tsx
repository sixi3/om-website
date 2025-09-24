'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LendingRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/moneyone/solutions/lending')
  }, [router])
  
  return <div>Redirecting...</div>
}