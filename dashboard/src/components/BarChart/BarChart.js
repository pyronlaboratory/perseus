import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

defaults.animation = false;

const BarChart = (props) => {
    let labels = [];
    let distributionData = [];
    
    props.data.map((item) => (
      labels.push(item.month)
    ));
  
    props.data.map((item) => (
      distributionData.push(item.total_number_of_users)
    ));
  
    
    const chartData = {
  
      labels: labels,
      datasets: [
        {
          label: '# user attempt per month distribution',
          data: distributionData,
          backgroundColor: ['#080A0E', '#082032', '#2C394B', '#334756', '#3C5467', '#445E74', '#4B6981', '#53738D', '#5B7E9A', '#6588A4', '#7292AC', '#7E9CB4'],
          borderColor: ['#080A0E', '#082032', '#2C394B', '#334756', '#3C5467', '#445E74', '#4B6981', '#53738D', '#5B7E9A', '#6588A4', '#7292AC', '#7E9CB4'],
          borderWidth: 1,
        },
      ],
    }
  
    return (
        <Bar 
            data={chartData}
            options={{
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'center',
                        display: false
                    }
                }
            }}
        />
    );
}

export default BarChart