import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ProgressDashboard = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('/api/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const data = {
    labels: goals.map((goal) => goal.title),
    datasets: [
      {
        label: 'Completion Percentage',
        data: goals.map((goal) => goal.completionPercentage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Progress Dashboard</h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressDashboard;
