import * as API from './apiConfig';

export const getMostSubmissions = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_MOST_SUBMISSIONS}`);
        const data = await response.json();
        return data.top_performering_user_to_complete_most_course;
    } catch (err) {
        console.log(err);
    }
};