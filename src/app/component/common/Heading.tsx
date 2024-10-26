import React from 'react'

const Heading = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <Heading>{children}</Heading>
    </div>
  )
}

export default Heading
