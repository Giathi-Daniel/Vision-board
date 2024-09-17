import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('/api/goals/progress');
        setGoals(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching goals');
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const getTotalProgress = (subgoals) => {
    const totalProgress = subgoals.reduce((acc, subgoal) => acc + subgoal.progress, 0);
    return subgoals.length > 0 ? Math.round(totalProgress / subgoals.length) : 0;
  };

  const pieData = goals.map((goal) => ({
    name: goal.title,
    value: getTotalProgress(goal.subgoals),
  }));

  const lineData = goals.map((goal) => ({
    name: goal.title,
    progress: getTotalProgress(goal.subgoals),
  }));

  if (loading) {
    return <p>Loading goals data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (goals.length === 0) {
    return <p>No goals available to display.</p>;
  }

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-8 text-3xl font-bold">Progress Dashboard</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Pie Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
            <h3 className="mb-4 text-xl font-semibold">Goal Completion Overview</h3>
            {pieData.length > 0 ? (
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
            ) : (
              <p>No progress data available</p>
            )}
          </div>
        </div>

        {/* Line Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
            <h3 className="mb-4 text-xl font-semibold">Goal Progress Over Time</h3>
            {lineData.length > 0 ? (
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
            ) : (
              <p>No progress data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
