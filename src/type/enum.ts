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
export {userStatus,EUserRole,ECourseStatus,ECourseLevel,ELessonType} 