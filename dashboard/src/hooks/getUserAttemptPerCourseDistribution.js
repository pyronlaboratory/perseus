import * as API from './apiConfig';

export const getUserAttemptPerCourseDistribution = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_USERS_ATTEMPT_PER_COURSE_DISTRIBUTION}`);
        const data = await response.json();
        return data.users_per_course;
    } catch (err) {
        console.log(err);
    }
};