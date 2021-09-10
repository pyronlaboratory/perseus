import * as API from './apiConfig';

export const getFastestSubmissions = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_FASTEST_SUBMISSIONS}`);
        const data = await response.json();
        return data.top_performering_user_to_complete_course_fastest;
    } catch (err) {
        console.log(err);
    }
};