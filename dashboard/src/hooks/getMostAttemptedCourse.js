import * as API from './apiConfig';

export const getMostAttemptedCourse = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_MOST_ATTEMPTED_COURSE}`);
        const data = await response.json();
        return data.most_attempted_courses[0];
    } catch (err) {
        console.log(err);
    }
};