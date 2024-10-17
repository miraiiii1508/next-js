'use client'
import { ActiveLinkProps } from '@/type/type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ActiveLink = ({url,children}:ActiveLinkProps) => {
    const pathName = usePathname()
    const isActive = url === pathName
  return (
    <Link
    href={url}
    className={`p-3 rounded-md flex items-center gap-3  ${isActive ? "text-primary bg-primary bg-opacity-10 svg-animation" : "hover:text-primary hover:bg-primary hover:bg-opacity-10"}`}
  >
    {children}
  </Link>
  )
}

export default ActiveLink
