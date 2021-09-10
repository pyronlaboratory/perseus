import * as API from './apiConfig';

export const getUserAttemptPerMonthDistribution = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${API.GET_USERS_ATTEMPT_PER_MONTH_DISTRIBUTION}`);
        const data = await response.json();
        return data.users_per_month_distribution;
    } catch (err) {
        console.log(err);
    }
};