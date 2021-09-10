from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin

from collections import Counter
from itertools import groupby

# flask imports
from flask import Flask, jsonify, request, render_template, send_from_directory, json, current_app as app
from flask_cors import CORS

# import marshmallow data schemas
from schema import (
    AverageCourseCompeletionTime,
    CourseSummaryListResponse,
    FastestUsersToCompleteCourseListResponse,
    LeastAttemptedCourseListResponse,
    MostAttemptedCourseListResponse,
    RecentCourseSubmissionsListResponse,
    TopPerformerByMostCompletedCoursesListResponse,
    TopPerformerByFastestCompletionTimeListResponse,
    TotalAttemptedCourses,
    UserAttemptPerMonthDistributionListResponse,
    UserAttemptPerDayDistributionListResponse,
    UserCourseSummaryListResponse,
    UsersPerCourseDistributionListResponse,
)

import os
import utils

# initiate the backend service    
app = Flask(__name__, template_folder='swagger/templates')

# enable cors
CORS(app)

# extract static data from local directory
# static/data/users.json
user_dict_obj = utils.get_static_data('users.json', True)
# static/data/courses.json
course_dict_obj = utils.get_static_data('courses.json', True)
# static/data/users_data.json
certifications_data = utils.get_static_data('certifications.json', False)

# generate course summary
def generate_course_summary():
    # course summary dictionary
    course_summary_data = [] 

    for index, certification in enumerate(certifications_data):
        summary = {}
        
        summary["id"] = index
        
        user_id = user_dict_obj[certification["user"]]["id"]
        summary["user_id"]=user_id

        user_firstname = user_dict_obj[certification["user"]]["firstName"]
        summary["user_firstname"] = user_firstname

        user_lastname = user_dict_obj[certification["user"]]["lastName"]
        summary["user_lastname"] = user_lastname

        user_email = user_dict_obj[certification["user"]]["email"]
        summary["user_email"] = user_email
        
        course_id = course_dict_obj[certification["course"]]["id"]
        summary["course_id"] = course_id
        
        course_name = course_dict_obj[certification["course"]]["title"]
        summary["course_name"] = course_name
        
        course_started_at = certification["startDate"]
        course_started_at = utils.get_date(course_started_at)
        summary["course_started_at"] = course_started_at
        
        course_finished_at = certification["completedDate"]
        course_finished_at = utils.get_date(course_finished_at)
        summary["course_finished_at"] = course_finished_at
        
        delta = course_finished_at - course_started_at
        course_completion_time = delta.total_seconds()
        summary["course_completion_time"] = course_completion_time
        
        course_summary_data.append(summary)

    return course_summary_data

spec = APISpec(
    title = "Data Service API | Swagger Documentation",
    version = "1.0.0",
    openapi_version = "3.0.2",
    plugins = [FlaskPlugin(), MarshmallowPlugin()]
)

# test route
@app.route("/")
def index():
    return render_template('home.html')

# swagger spec route
@app.route('/api/swagger.json')
def create_swagger_spec():
    return jsonify(spec.to_dict())

# api/v1 routes
@app.route('/api/v1/get-course-summary')
def get_course_summary():
    """Get list of course summary attempted by users
    ---
    get:
        description: Get list of course summary attempted by users
        responses:
            200:
                description: Return list of course summary attempted by users
                content:
                    application/json:
                        schema: CourseSummaryListResponse
    """
    try:
        course_summary_data = generate_course_summary()        
        return CourseSummaryListResponse().dump({'course_summary': course_summary_data})
    
    except Exception as e:
        print('Error at /api/v1/get-course-summary: ', e)

@app.route('/api/v1/get-user-course-summary/<user_id>', methods=["POST"])
def get_user_course_summary(user_id):
    """Get details of a particular user's course summary
    ---
    post:
        parameters:
          - in: path
            name: user_id
            required: true
            description: user id of the user for reporting course summary, 
                         try 654af1f0-8038-48c4-be3b-2503e8982d5b
            type: string

        description: Get details of a particular user's course summary
        responses:
            200:
                description: Return details of a particular user's course summary
                content:
                    application/json:
                        schema: UserCourseSummaryListResponse
    """
    try:
        if request.method == "POST":
            user_course_summary_data = [] # course summary dictionary

            user_id = user_dict_obj[user_id]["id"]
            user_email = user_dict_obj[user_id]["email"]
            user_firstname = user_dict_obj[user_id]["firstName"]
            user_lastname = user_dict_obj[user_id]["lastName"]

            for certification in certifications_data:
                if certification["user"] == user_id:
                    summary = {}
                    
                    course_id = course_dict_obj[certification["course"]]["id"]
                    summary["course_id"] = course_id
                    
                    course_name = course_dict_obj[certification["course"]]["title"]
                    summary["course_name"] = course_name
                    
                    course_started_at = certification["startDate"]
                    course_started_at = utils.get_date(course_started_at)
                    summary["course_started_at"] = course_started_at
                    
                    course_finished_at = certification["completedDate"]
                    course_finished_at = utils.get_date(course_finished_at)
                    summary["course_finished_at"] = course_finished_at
                    
                    delta = course_finished_at - course_started_at
                    course_completion_time = delta.total_seconds()
                    summary["course_completion_time"] = course_completion_time
                    

                    user_course_summary_data.append(summary)
            
            total_courses_attempted = user_course_summary_data.__len__()
            first_course_attempted = sorted(user_course_summary_data, key = lambda i: i["course_started_at"])[0]["course_name"]
            latest_course_attempted = sorted(user_course_summary_data, key = lambda i: i["course_started_at"])[-1]["course_name"]

            return UserCourseSummaryListResponse().dump({
                "user_id": user_id, 
                "user_course_summary": user_course_summary_data,
                "user_email": user_email,
                "user_firstname": user_firstname,
                "user_lastname": user_lastname,
                "total_courses_attempted": total_courses_attempted,
                "first_course_attempted": first_course_attempted,
                "latest_course_attempted": latest_course_attempted
                
                })
        
    except Exception as e:
        print(print('Error at /api/v1/get-user-course-summary/<user_id>: ', e))

@app.route('/api/v1/get-total-attempted-courses')
def get_total_attempted_courses():
    """Get total attempted courses by all users combined
    ---
    get:
        description: Get total attempted courses by all users combined
        responses:
            200:
                description: Return total attempted courses by all users combined
                content:
                    application/json:
                        schema: TotalAttemptedCourses
    """
    try:
        return TotalAttemptedCourses().dump({ "total_attempted_courses": certifications_data.__len__()})
    except Exception as e:
        print('Error at /api/v1/get-total-attempted-courses: ', e)

@app.route('/api/v1/get-most-attempted-courses')
def get_most_attempted_courses():
    """Get the most attempted courses by users
    ---
    get:
        description: Get the most attempted courses by users
        responses:
            200:
                description: Return list of most attempted courses by users
                content:
                    application/json:
                        schema: MostAttemptedCourseListResponse
    """
    try:
        most_attempted_courses = []
        course_count = Counter(cd['course'] for cd in certifications_data)

        # get max frequency    
        max_freq_count = 0
        for course in course_count.most_common():
            if course[1] >= max_freq_count:
                max_freq_count = course[1]

        # filter courses details with max frequency
        for course in course_count.most_common():
            if course[1] == max_freq_count:
                course_title = course_dict_obj[course[0]]["title"]
                frequency_of_course_attempt = max_freq_count
                most_attempted_courses.append({
                    "course_title": course_title,
                    "frequency_of_course_attempt": frequency_of_course_attempt
                })
        
        return MostAttemptedCourseListResponse().dump({ "most_attempted_courses": most_attempted_courses})
    except Exception as e:
        print('Error at /api/v1/get-most-attempted-courses: ', e)

@app.route('/api/v1/get-least-attempted-courses')
def get_least_attempted_courses():
    """Get the least attempted courses by users
    ---
    get:
        description: Get the least attempted courses by users
        responses:
            200:
                description: Return list of least attempted courses by users
                content:
                    application/json:
                        schema: LeastAttemptedCourseListResponse
    """
    try:
        least_attempted_courses = []
        course_count = Counter(cd['course'] for cd in certifications_data)

        # get least frequency
        least_freq_count = 99999 # random large number to initiate the flag
        for course in course_count.most_common():
            if course[1] <= least_freq_count:
                least_freq_count = course[1]

        # filter courses details with least frequency
        for course in course_count.most_common():
            if course[1] == least_freq_count:
                course_title = course_dict_obj[course[0]]["title"]
                frequency_of_course_attempt = least_freq_count
                least_attempted_courses.append({
                    "course_title": course_title,
                    "frequency_of_course_attempt": frequency_of_course_attempt
                })
        return LeastAttemptedCourseListResponse().dump({ "least_attempted_courses": least_attempted_courses})
    except Exception as e:
        print('Error at /api/v1/get-least-attempted-courses: ', e)

@app.route('/api/v1/get-avg-course-completion-time')
def get_avg_course_completion_time():
    """Get the average courses completion time
    ---
    get:
        description: Get the average courses completion time
        responses:
            200:
                description: Return the average courses completion time (in seconds)
                content:
                    application/json:
                        schema: AverageCourseCompeletionTime
    """
    try:
        compeletion_time = 0
        for certification in certifications_data:
            delta = utils.get_date(certification["completedDate"]) - utils.get_date(certification["startDate"])
            course_completion_time = delta.total_seconds()
            compeletion_time = compeletion_time + course_completion_time
        
        avg_completion_time = (compeletion_time)/(certifications_data.__len__())

        return AverageCourseCompeletionTime().dump({ "avg_completion_time": avg_completion_time})
    except Exception as e:
        print('Error at /api/v1/get-avg-course-completion-time : ', e)

@app.route('/api/v1/get-fastest-users-to-complete-course')
def get_fastest_user_to_complete_course():
    """Get the fastest users to complete course
    ---
    get:
        description: Get the fastest users to complete course
        responses:
            200:
                description: Return the fastest users to complete course
                content:
                    application/json:
                        schema: FastestUsersToCompleteCourseListResponse
    """
    try:
        fastest_users_to_complete_course = []
        course_summary_data = generate_course_summary()
        sorted_course_summary_data = sorted(course_summary_data, key=lambda i: i['course_completion_time']) 
        fastest_users_to_complete_course.append(sorted_course_summary_data[0])

        return FastestUsersToCompleteCourseListResponse().dump({"fastest_users_to_complete_course": fastest_users_to_complete_course})
    except Exception as e:
        print('Error at /api/v1/get-fastest-users-to-complete-course: ', e)

@app.route('/api/v1/get-recent-course-submissions')
def get_recent_course_submissions():
    """Get recent course submissions by users
    ---
    get:
        description: Get recent course submissions by users
        responses:
            200:
                description: Returns recently(5) submitted courses by users
                content:
                    application/json:
                        schema: RecentCourseSubmissionsListResponse
    """
    try:
        get_recent_course_submissions = list()
        course_summary_data = generate_course_summary()
        sorted_course_summary_data = sorted(course_summary_data, key=lambda i: i['course_finished_at'], reverse=True)[0:5] 
    
        for submission in sorted_course_summary_data:
            get_recent_course_submissions.append(submission)

        return RecentCourseSubmissionsListResponse().dump({"get_recent_course_submissions": get_recent_course_submissions})
    except Exception as e:
        print('Error at /api/v1/get-recent-course-submissions: ', e)

@app.route('/api/v1/get-top-performer-by-most-completed-courses')
def get_top_performer_by_most_completed_courses():
    """Get top performing users by most courses completed
    ---
    get:
        description: Get top performing users by most courses completed
        responses:
            200:
                description: Returns top performing users by most courses completed
                content:
                    application/json:
                        schema: TopPerformerByMostCompletedCoursesListResponse
    """
    try:
        top_performering_user_to_complete_most_course = list()

        completion_count = Counter(cd['user'] for cd in certifications_data)
        for index, users in enumerate(completion_count.most_common(5)):
            user_details = {}
            user_details["id"] = index
            user_details["user_id"] = user_dict_obj[users[0]]["id"]
            user_details["user_email"] = user_dict_obj[users[0]]["email"]
            user_details["user_firstname"] = user_dict_obj[users[0]]["firstName"]
            user_details["user_lastname"] = user_dict_obj[users[0]]["lastName"]
            user_details["total_courses_completed"] = users[1]

            top_performering_user_to_complete_most_course.append(user_details)
        return TopPerformerByMostCompletedCoursesListResponse().dump({"top_performering_user_to_complete_most_course": top_performering_user_to_complete_most_course})
    except Exception as e:
        print('Error at /api/v1/get-top-performer-by-most-completed-courses: ', e)

@app.route('/api/v1/get-top-performer-by-fastest-completion-time')
def get_top_performer_by_fastest_completion_time():
    """Get top performing users by fastest course completion time
    ---
    get:
        description: Get top performing users by fastest course completion time
        responses:
            200:
                description: Returns top performing users by fastest course completion time
                content:
                    application/json:
                        schema: TopPerformerByFastestCompletionTimeListResponse
    """
    try:
        top_performering_user_to_complete_course_fastest = list()
        course_summary_data = generate_course_summary()
        sorted_course_summary_data = sorted(course_summary_data, key=lambda i: i['course_completion_time'])[0:5] 
    
        for users in sorted_course_summary_data:
            top_performering_user_to_complete_course_fastest.append(users)
    
        return TopPerformerByFastestCompletionTimeListResponse().dump({"top_performering_user_to_complete_course_fastest": top_performering_user_to_complete_course_fastest})
    except Exception as e:
        print("Error at /api/v1/get-top-performer-by-fastest-completion-time: ", e)

@app.route('/api/v1/get-users-per-course-distribution')
def get_users_per_course_distribution():
    """Get distribution data for total number of users per course
    ---
    get:
        description: Get distribution data for total number of users per course
        responses:
            200:
                description: Returns distribution data for total number of users per course
                content:
                    application/json:
                        schema: UsersPerCourseDistributionListResponse
    """
    try:
        users_per_course = list()
        course_count = Counter(cd['course'] for cd in certifications_data)
        for course in course_count.most_common():
            distribution = dict()
            distribution["course_id"] = course[0]
            distribution["course_title"] = course_dict_obj[course[0]]["title"]  
            distribution["total_number_of_users"] = course[1]

            users_per_course.append(distribution)

        return UsersPerCourseDistributionListResponse().dump({"users_per_course": users_per_course})
    except Exception as e:
        print("Error at /api/v1/get-users-per-course-distribution: ", e)

@app.route('/api/v1/get-user-attempt-per-month-distribution')
def get_users_attempt_per_month_distribution():
    """Get distribution data for total number of users attempting course per month
    ---
    get:
        description: Get distribution data for total number of users attempting course per month
        responses:
            200:
                description: Returns distribution data for total number of users attempting course per month
                content:
                    application/json:
                        schema: UserAttemptPerMonthDistributionListResponse
    """
    try:
        users_per_month_distribution = list()
        sorted_certifications_data = sorted(certifications_data, key=lambda i: i['startDate'])
        
        for month, attempts in groupby(sorted_certifications_data, key=lambda i: i['startDate'].split("T")[0][:7]):
            distribution = dict()
            distribution["month"] = month
            distribution["total_number_of_users"] = len(list(attempts))

            users_per_month_distribution.append(distribution)
        
        return UserAttemptPerMonthDistributionListResponse().dump({"users_per_month_distribution": users_per_month_distribution})
    except Exception as e:
        print("Error at /api/v1/get-user-attempt-per-month-distribution: ", e)

@app.route('/api/v1/get-user-attempt-per-day-distribution/<month_of_year>', methods=["POST"])
def get_users_attempt_per_day_distribution(month_of_year):
    """Get distribution data for total number of users attempting course per day
    ---
    post:
        parameters:
          - in: path
            name: month_of_year
            required: true
            description: user id of the user for reporting course summary, 
                         try 2020-10
            type: string
        description: Get distribution data for total number of users attempting course per day
        responses:
            200:
                description: Returns distribution data for total number of users attempting course per day
                content:
                    application/json:
                        schema: UserAttemptPerDayDistributionListResponse
    """
    try:
        users_per_day_distribution = list()
        users_per_day = list()
        for certification in certifications_data:
            
            if month_of_year in certification["startDate"]:
                distribution = dict()
                distribution["date"] = certification["startDate"].split("T")[0]
                distribution["time"] = certification["startDate"].split("T")[1].split(".")[0]
                distribution["user_id"] = certification["user"]

                users_per_day.append(distribution)

        users_per_day = sorted(users_per_day, key=lambda i: i['date'])
        for date, attempts in groupby(users_per_day, key=lambda i: i['date']):
            daily_distribution = dict()
            total_attempts = list(attempts)
            
            daily_distribution["date"] = date
            daily_distribution["total_number_of_users"] = len(total_attempts)
            daily_distribution["details"] = total_attempts

            users_per_day_distribution.append(daily_distribution)
    
        return UserAttemptPerDayDistributionListResponse().dump({"users_per_day_distribution": users_per_day_distribution})
    except Exception as e:
        print("Error at /api/v1/get-user-attempt-per-day-distribution/<month_of_year>: ", e)

with app.test_request_context():
    spec.path(view=get_course_summary)
    spec.path(view=get_user_course_summary)
    spec.path(view=get_total_attempted_courses)
    spec.path(view=get_most_attempted_courses)
    spec.path(view=get_least_attempted_courses)
    spec.path(view=get_avg_course_completion_time)
    spec.path(view=get_fastest_user_to_complete_course)
    spec.path(view=get_recent_course_submissions)
    spec.path(view=get_top_performer_by_most_completed_courses)
    spec.path(view=get_top_performer_by_fastest_completion_time)
    spec.path(view=get_users_per_course_distribution)
    spec.path(view=get_users_attempt_per_month_distribution)
    spec.path(view=get_users_attempt_per_day_distribution)

# swagger open api documentation routes
@app.route('/docs')
@app.route('/docs/<path:path>')
def swagger_docs(path=None):
    if not path or path == 'index.html':
        return render_template('index.html', base_url='/docs')
    else:
        return send_from_directory('./swagger/static', path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)