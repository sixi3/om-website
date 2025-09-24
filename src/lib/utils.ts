import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDomainSpecificHref(href: string): string {
  if (typeof window === 'undefined') return href

  const host = window.location.host

  // Check for moneyone.in domain
  const isMoneyOneDomain = host.includes('moneyone.in')
  if (isMoneyOneDomain && href.startsWith('/moneyone/')) {
    const pathWithoutDomain = href.replace('/moneyone/', '')
    return pathWithoutDomain.startsWith('/') ? pathWithoutDomain : `/${pathWithoutDomain}`
  }

  // Check for onemoney subdomain
  const isOneMoneyDomain = host.includes('onemoney.in') || host.includes('d2bd7hfw4pwyvv.cloudfront.net')
  if (isOneMoneyDomain && href.startsWith('/onemoney/')) {
    const pathWithoutDomain = href.replace('/onemoney/', '')
    return pathWithoutDomain.startsWith('/') ? pathWithoutDomain : `/${pathWithoutDomain}`
  }

  return href
}
