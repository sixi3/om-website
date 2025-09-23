import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomainSpecificHref(href: string): string {
  if (typeof window === 'undefined') return href

  const host = window.location.host

  // Check for moneyone.in domain
  const isMoneyOneDomain = host === 'moneyone.in' || host === 'www.moneyone.in'
  if (isMoneyOneDomain && href.startsWith('/moneyone/')) {
    return href.replace('/moneyone/', '')
  }

  // Check for onemoney subdomain
  const isOneMoneyDomain = host === 'onemoney.in' || host === 'www.onemoney.in'
  if (isOneMoneyDomain && href.startsWith('/onemoney/')) {
    return href.replace('/onemoney/', '')
  }

  return href
}
