import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomainSpecificHref(href: string): string {
  if (typeof window === 'undefined') return href
  
  const host = window.location.host
  const isMoneyOneDomain = host === 'moneyone.in' || host === 'www.moneyone.in'
  
  if (isMoneyOneDomain && href.startsWith('/moneyone/')) {
    return href.replace('/moneyone/', '')
  }
  
  return href
}
