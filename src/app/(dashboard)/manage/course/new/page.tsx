import CourseAddNew from '@/app/component/course/CourseAddNew'
import Heading from '@/app/component/typography/Heading'
import { getUserId } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import React from 'react'


const page = async() => {
  const {userId} = auth()
  if(!userId) return null
  const moongoUser = await getUserId({userId})
  if(!moongoUser) return 
  const parseUser = JSON.parse(JSON.stringify(moongoUser))
  return (
    <div>
      <Heading>Tạo khoá học mới</Heading>
      <CourseAddNew user = {parseUser}></CourseAddNew>
    </div>
  )
}

export default page
