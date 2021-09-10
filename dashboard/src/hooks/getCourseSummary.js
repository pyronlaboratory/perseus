import * as API from './apiConfig';

export const getCourseSummary = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_COURSE_SUMMARY}`);
        const data = await response.json();
        return data.course_summary;
    } catch (err) {
        console.log(err);
    }
};