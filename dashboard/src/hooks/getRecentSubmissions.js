import * as API from './apiConfig';

export const getRecentSubmissions = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_RECENT_SUBMISSIONS}`);
        const data = await response.json();
        return data.get_recent_course_submissions;
    } catch (err) {
        console.log(err);
    }
};