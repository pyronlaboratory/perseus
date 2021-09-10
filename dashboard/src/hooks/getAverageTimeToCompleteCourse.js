import * as API from './apiConfig';

export const getAverageTimeToCompleteCourse = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_AVERAGE_TIME_TO_COMPLETE_COURSE}`);
        const data = await response.json();
        return (Math.round(((data.avg_completion_time)/86400) * 10) / 10);
    } catch (err) {
        console.log(err);
    }
};