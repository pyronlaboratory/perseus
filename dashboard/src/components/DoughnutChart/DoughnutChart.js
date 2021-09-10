import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';

defaults.animation = false;

const DoughnutChart = (props) => {
    let labels = [];
    let distributionData = [];
  
    props.data.map((item) => (
        labels.push(item.course_title)
    ));

    props.data.map((item) => (
        distributionData.push(item.total_number_of_users)
    ));

    const chartData = {

        labels: labels,
        datasets: [{
            label: '# user distribution per course',
            data: distributionData,
            backgroundColor: ['#080A0E', '#082032', '#2C394B', '#334756', '#CCDBDC', '#FF4C29'],
            borderColor: ['#080A0E', '#082032', '#2C394B', '#334756', '#CCDBDC', '#FF4C29'],
            borderWidth: 0.5,
        }],
    }

    return (
        <Doughnut 
            data={chartData} 
            options={{
                plugins: {
                    legend: {
                    position: 'bottom',
                    align: 'center',
                    // display: false
                }
            }
            }}
        />
    );
}

export default DoughnutChart