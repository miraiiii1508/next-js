import React from 'react'

const LoadingOutline = () => {
  return (
    <div>
    <div className="h-2 w-full rounded-full mb-2 skeleton"></div>
    <div className="flex flex-col gap-5">
        <div className="skeleton w-full rounded-lg h-14"></div>
        <div className="skeleton w-full rounded-lg h-14"></div>
    </div>
  </div>
  )
}

export default LoadingOutline
