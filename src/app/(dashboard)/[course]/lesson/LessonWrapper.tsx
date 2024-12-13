'use client'
import useGlobalStore from '@/store'
import React from 'react'

const LessonWrapper = ({children}:{children:React.ReactNode}) => {
    const {expendedPlayer} = useGlobalStore()
  return (
    <div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start" 
    style={{
        display:expendedPlayer ?'block':'grid'
    }}
    >
      {children}
    </div>
  )
}

export default LessonWrapper
