from marshmallow import Schema, fields


class CourseSummary(Schema):
    id = fields.Int()
    user_id = fields.Str()
    user_firstname = fields.Str()
    user_lastname = fields.Str()
    user_email = fields.Email()
    course_id = fields.Str()
    course_name = fields.Str()
    course_started_at = fields.DateTime()
    course_finished_at = fields.DateTime()
    course_completion_time = fields.Number()


class CourseSummaryListResponse(Schema):
    course_summary = fields.List(fields.Nested(CourseSummary))


class UserCourseSummary(Schema):
    course_id = fields.Str()
    course_name = fields.Str()
    course_started_at = fields.DateTime()
    course_finished_at = fields.DateTime()
    course_completion_time = fields.Number()


class UserCourseSummaryListResponse(Schema):
    user_id = fields.Str()
    user_email = fields.Email()
    user_firstname = fields.Str()
    user_lastname = fields.Str()
    total_courses_attempted = fields.Int()
    first_course_attempted = fields.Str()
    latest_course_attempted = fields.Str()
    user_course_summary = fields.List(fields.Nested(UserCourseSummary))


class TotalAttemptedCourses(Schema):
    total_attempted_courses = fields.Int()


class MostAttemptedCourse(Schema):
    course_title = fields.Str()
    frequency_of_course_attempt = fields.Int()


class MostAttemptedCourseListResponse(Schema):
    most_attempted_courses = fields.List(fields.Nested(MostAttemptedCourse))


class LeastAttemptedCourse(Schema):
    course_title = fields.Str()
    frequency_of_course_attempt = fields.Int()


class LeastAttemptedCourseListResponse(Schema):
    least_attempted_courses = fields.List(fields.Nested(LeastAttemptedCourse))


class AverageCourseCompeletionTime(Schema):
    avg_completion_time = fields.Number()


class FastestUserToCompleteCourse(Schema):
    id = fields.Int()
    user_id = fields.Str()
    user_firstname = fields.Str()
    user_lastname = fields.Str()
    user_email = fields.Email()
    course_id = fields.Str()
    course_name = fields.Str()
    course_started_at = fields.DateTime()
    course_finished_at = fields.DateTime()
    course_completion_time = fields.Number()    


class FastestUsersToCompleteCourseListResponse(Schema):
    fastest_users_to_complete_course = fields.List(fields.Nested(FastestUserToCompleteCourse))


class RecentCourseSubmissions(Schema):
    id = fields.Int()
    user_id = fields.Str()
    user_firstname = fields.Str()
    user_lastname = fields.Str()
    user_email = fields.Email()
    course_id = fields.Str()
    course_name = fields.Str()
    course_started_at = fields.DateTime()
    course_finished_at = fields.DateTime()
    course_completion_time = fields.Number() 


class RecentCourseSubmissionsListResponse(Schema):
    get_recent_course_submissions = fields.List(fields.Nested(RecentCourseSubmissions)) 


class TopPerformerByMostCompletedCourses(Schema):
    id = fields.Int()
    user_id = fields.Str()
    user_firstname = fields.Str()
    user_lastname = fields.Str()
    user_email = fields.Email()
    total_courses_completed = fields.Int()


class TopPerformerByMostCompletedCoursesListResponse(Schema):
    top_performering_user_to_complete_most_course = fields.List(fields.Nested(TopPerformerByMostCompletedCourses))


class TopPerformerByFastestCompletionTime(Schema):
    id = fields.Int()
    user_id = fields.Str()
    user_firstname = fields.Str()
    user_lastname = fields.Str()
    user_email = fields.Email()
    course_id = fields.Str()
    course_name = fields.Str()
    course_started_at = fields.DateTime()
    course_finished_at = fields.DateTime()
    course_completion_time = fields.Number() 


class TopPerformerByFastestCompletionTimeListResponse(Schema):
    top_performering_user_to_complete_course_fastest = fields.List(fields.Nested(TopPerformerByFastestCompletionTime))


class UsersPerCourseDistribution(Schema):
    course_id = fields.Str()
    course_title = fields.Str()
    total_number_of_users = fields.Int()


class UsersPerCourseDistributionListResponse(Schema):
    users_per_course = fields.List(fields.Nested(UsersPerCourseDistribution))


class UserAttemptPerMonthDistribution(Schema):
    month = fields.Str()
    total_number_of_users = fields.Int()


class UserAttemptPerMonthDistributionListResponse(Schema):
    users_per_month_distribution = fields.List(fields.Nested(UserAttemptPerMonthDistribution))


class UserAttemptPerDay(Schema):
    date = fields.Str()
    time = fields.Str()
    user_id = fields.Str()


class UserAttemptPerDayDistribution(Schema):
    date = fields.Str()
    total_number_of_users = fields.Int()
    details = fields.List(fields.Nested(UserAttemptPerDay))


class UserAttemptPerDayDistributionListResponse(Schema):
    users_per_day_distribution = fields.List(fields.Nested(UserAttemptPerDayDistribution))
