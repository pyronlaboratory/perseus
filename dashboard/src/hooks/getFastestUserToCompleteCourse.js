import * as API from './apiConfig';

export const getFastestUserToCompleteCourse = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_FASTEST_USER_TO_COMPLETE_COURSE}`);
        const data = await response.json();
        return data.fastest_users_to_complete_course[0];
    } catch (err) {
        console.log(err);
    }
};