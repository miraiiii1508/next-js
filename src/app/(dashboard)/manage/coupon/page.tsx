import CouponManage from '@/app/component/coupon/CouponManage'
import { getCoupons } from '@/lib/actions/coupon.actions'
import { ECouponType } from '@/type/enum';
import React from 'react'

const page = async({searchParams}:{searchParams:{page:number;search:string;status:ECouponType}}) => {
  const data = await getCoupons({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search, 
    status: searchParams.status 
  }) 
  return (
    <div>
      <CouponManage data={JSON.parse(JSON.stringify(data))}/>
    </div>
  )
}

export default page
