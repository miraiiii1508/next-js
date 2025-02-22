enum userStatus{
    ACTIVE='ACTIVE',
    UNACTIVE='UNACTIVE',
    BANNED='BANNED'
}
enum EUserRole{
    ADMIN='ADMIN',
    USER='USER',
    EXPERT='EXPERT'
}
enum ECourseStatus{
    APPROVED='APPROVED',
    PENDING='PENDING',
    REJECTED ='REJECTED'
}

enum ECourseLevel{
    BEGINNER='BEGINNER',
    INTERMEDIATE='INTERMEDIATE',
    ADVANCED ='REJECTED'
}
enum ELessonType{
    VIDEO='VIDEO',
    TEXT = 'TEXT'
}
enum EOrderStatus{
    PENDING ='PENDING',
    COMPLETE='COMPLETE',
    CANCELED ='CANCELED'
}
enum ECouponType{
    PERCENT='PERCENT',
    MONEY='MONEY'
}
enum EPaymentType{
    MOMO='MOMO',
    VNPay='VNPAY',
    MBBANK='MBBANK',
    VIETTINBANK='VIETTINBANK'
}
enum ECouponStatus {
    true='true',
    fales='false'
}
export { userStatus,EUserRole,ECourseStatus,ECourseLevel,ELessonType,EOrderStatus ,ECouponType,EPaymentType,ECouponStatus} 