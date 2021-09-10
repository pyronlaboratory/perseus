import os
import unittest
import requests

class TestAPI(unittest.TestCase):
    URL = os.environ.get("PRODUCTION_URL", "http://localhost:5000")

    payload_1 = "654af1f0-8038-48c4-be3b-2503e8982d5b"
    payload_2 = "2020-10"

    def test_1_get_avg_course_completion_time(self):
        response = requests.get(self.URL + "/api/v1/get-avg-course-completion-time")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        print("Test case #1 completed")

    def test_2_get_course_summary(self):
        response = requests.get(self.URL + "/api/v1/get-course-summary")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['course_summary']), 500)
        print("Test case #2 completed")

    def test_3_get_fastest_users_to_complete_course(self):
        response = requests.get(self.URL + "/api/v1/get-fastest-users-to-complete-course")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['fastest_users_to_complete_course']), 1)
        print("Test case #3 completed")

    def test_4_get_least_attempted_course(self):
        response = requests.get(self.URL + "/api/v1/get-least-attempted-courses")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['least_attempted_courses']), 1)
        print("Test case #4 completed")

    def test_5_get_most_attempted_course(self):
        response = requests.get(self.URL + "/api/v1/get-most-attempted-courses")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['most_attempted_courses']), 1)
        print("Test case #5 completed")

    def test_6_get_recent_course_submissions(self):
        response = requests.get(self.URL + "/api/v1/get-recent-course-submissions")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['get_recent_course_submissions']), 5)
        print("Test case #6 completed")

    def test_7_get_top_performer_by_fastest_completion_time(self):
        response = requests.get(self.URL + "/api/v1/get-top-performer-by-fastest-completion-time")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['top_performering_user_to_complete_course_fastest']), 5)
        print("Test case #7 completed")

    def test_8_get_top_performer_by_most_completed_courses(self):
        response = requests.get(self.URL + "/api/v1/get-top-performer-by-most-completed-courses")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['top_performering_user_to_complete_most_course']), 5)
        print("Test case #8 completed")

    def test_9_get_total_attempted_courses(self):
        response = requests.get(self.URL + "/api/v1/get-total-attempted-courses")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        print("Test case #9 completed")

    def test_10_get_user_attempt_per_month_distribution(self):
        response = requests.get(self.URL + "/api/v1/get-user-attempt-per-month-distribution")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['users_per_month_distribution']), 12)
        print("Test case #10 completed")

    def test_11_get_users_per_course_distribution(self):
        response = requests.get(self.URL + "/api/v1/get-users-per-course-distribution")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()['users_per_course']), 6)
        print("Test case #11 completed")

    def test_12_get_user_course_summary(self):
        response = requests.post(self.URL + "/api/v1/get-user-course-summary/" + self.payload_1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 8)
        print("Test case #12 completed")

    def test_13_get_user_attempt_per_day_distribution(self):
        response = requests.post(self.URL + "/api/v1/get-user-attempt-per-day-distribution/" + self.payload_2)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        print("Test case #13 completed")

if __name__ == "__main__":
    unittest.main()