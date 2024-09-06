import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ProgressDashboard = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axios.get('/api/goals');
      setGoals(response.data);
    };

    fetchGoals();
  }, []);

  const data = {
    labels: goals.map(goal => goal.title),
    datasets: [
      {
        label: 'Completion Percentage',
        data: goals.map(goal => goal.completionPercentage),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}% Completed`;
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Goal Progress Overview</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressDashboard;
