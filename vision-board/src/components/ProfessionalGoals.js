import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddCategoryForm from "./Category/AddCategoryForm";
import axios from 'axios';

function ProfessionalGoals() {
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', category: '' });
  const [newSubgoal, setNewSubgoal] = useState({ title: '', description: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/goals')
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error('Error fetching goals:', error));

    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleGoalSubmit = (e) => {
    e.preventDefault();

    fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal),
    })
      .then((response) => response.json())
      .then((data) => {
        setGoals([...goals, data]);
        setNewGoal({ title: '', description: '', category: '' });
      })
      .catch((error) => console.error('Error adding goal:', error));
  };

  const handleAddSubgoal = async (goalId) => {
    const res = await axios.post(`/api/goals/${goalId}/subgoals`, newSubgoal);
    setGoals(goals.map(goal => goal._id === goalId ? res.data : goal));
    setNewSubgoal({ title: '', description: '' });
  };

  const handleToggleSubgoal = async (goalId, subgoalId, completed) => {
    const res = await axios.put(`/api/goals/${goalId}/subgoals/${subgoalId}`, { completed });
    setGoals(goals.map(goal => goal._id === goalId ? res.data : goal));
  };

  const handleDeleteSubgoal = async (goalId, subgoalId) => {
    const res = await axios.delete(`/api/goals/${goalId}/subgoals/${subgoalId}`);
    setGoals(goals.map(goal => goal._id === goalId ? res.data : goal));
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
 
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Professional/Career Goals</h2>
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal._id} className="p-4 border rounded-md bg-white shadow-sm">
              <h3 className="text-lg font-semibold">{goal.title}</h3>
              <p className="text-gray-700">
                {goal.description.length > 100 ? `${goal.description.substring(0, 100)}...` : goal.description}
              </p>
              <span className="block mt-2 text-sm text-gray-600">
                Category: {goal.category || 'Uncategorized'}
              </span>
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Subgoals</h4>
                <ul className="ml-4 list-disc">
                  {goal.subgoals.map(subgoal => (
                    <li key={subgoal._id} className="mb-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={subgoal.completed}
                          onChange={() => handleToggleSubgoal(goal._id, subgoal._id, !subgoal.completed)}
                          className="mr-2"
                        />
                        <span className={subgoal.completed ? 'line-through text-gray-500' : ''}>
                          {subgoal.title}
                        </span>
                        <button
                          onClick={() => handleDeleteSubgoal(goal._id, subgoal._id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{subgoal.description}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h5 className="font-semibold text-sm">Add Subgoal</h5>
                  <input
                    type="text"
                    placeholder="Subgoal Title"
                    value={newSubgoal.title}
                    onChange={(e) => setNewSubgoal({ ...newSubgoal, title: e.target.value })}
                    className="mt-2 px-3 py-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    placeholder="Subgoal Description"
                    value={newSubgoal.description}
                    onChange={(e) => setNewSubgoal({ ...newSubgoal, description: e.target.value })}
                    className="mt-2 px-3 py-2 border rounded-md w-full"
                  />
                  <button
                    onClick={() => handleAddSubgoal(goal._id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Add Subgoal
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Goal</h2>
        <form onSubmit={handleGoalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>
          </div>
          <div className="col-span-2">
            <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md w-full">
              Add Goal
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-between space-x-4">
        <Link to="/manage-categories" className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-md">
          Manage Categories
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="block w-full text-center bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Add New Category
        </button>
      </div>

      {showModal && (
        <AddCategoryForm
          onCategoryAdded={handleCategoryAdded}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ProfessionalGoals;
