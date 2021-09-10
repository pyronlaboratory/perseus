import * as API from './apiConfig';

export const getLeastAttemptedCourse = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_LEAST_ATTEMPTED_COURSE}`);
        const data = await response.json();
        return data.least_attempted_courses[0];
    } catch (err) {
        console.log(err);
    }
};