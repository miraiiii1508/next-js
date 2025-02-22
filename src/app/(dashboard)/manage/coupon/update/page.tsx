import CouponUpdate from '@/app/component/coupon/CouponUpdate'
import Heading from '@/app/component/typography/Heading'
import { getCouponByCode } from '@/lib/actions/coupon.actions'
import React from 'react'

const page = async({searchParams}:{searchParams:{
    code:string
}}) => {
    const couponDetails = await getCouponByCode({params:{code:searchParams.code} })
    if(!couponDetails){
        return null
    }
  return (
    <div>
      <Heading>Cập nhật mã giảm giá</Heading>
      <CouponUpdate data ={couponDetails}/>
    </div>
  )
}

export default page
