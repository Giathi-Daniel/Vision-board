import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('/api/goals/progress');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const getTotalProgress = (subgoals) => {
    const totalProgress = subgoals.reduce((acc, subgoal) => acc + subgoal.progress, 0);
    return Math.round(totalProgress / subgoals.length);
  };

  const pieData = goals.map((goal) => ({
    name: goal.title,
    value: getTotalProgress(goal.subgoals),
  }));

  const lineData = goals.map((goal) => ({
    name: goal.title,
    progress: getTotalProgress(goal.subgoals),
  }));

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Progress Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
            <h3 className="text-xl font-semibold mb-4">Goal Completion Overview</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Line Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
            <h3 className="text-xl font-semibold mb-4">Goal Progress Over Time</h3>
            <div className="w-full h-72">
              <LineChart
                width={400}
                height={300}
                data={lineData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
