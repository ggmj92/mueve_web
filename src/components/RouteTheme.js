'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RouteTheme() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/') {
      document.body.classList.add('is-home')
    } else {
      document.body.classList.remove('is-home')
    }
  }, [pathname])
  return null
}
