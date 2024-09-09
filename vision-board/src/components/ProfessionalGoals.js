import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddCategoryForm from "./Category/AddCategoryForm";
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfessionalGoals() {
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', category: '' });
  const [showModal, setShowModal] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [sharedWith, setSharedWith] = useState([]);

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

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowModal(false); // Close the modal when the category is added
  };

  const handleCompletionChange = async (goalId, newPercentage) => {
    try {
      const response = await axios.put(`/api/goals/${goalId}/completion`, { completionPercentage: newPercentage });
      setGoals(goals.map(goal => goal._id === goalId ? response.data : goal));
      toast.success('Goal progress updated!');
    } catch (error) {
      toast.error('Error updating goal progress');
    }
  };

  const handlePublicShare = async () => {
    try {
      const response = await axios.post(`/api/goals/${goal._id}/share/public`);
      setShareLink(response.data.shareableLink);
      toast.success('Goal shared publicly!');
    } catch (error) {
      toast.error('Error sharing goal');
    }
  };

  const handlePrivateShare = async () => {
    try {
      const response = await axios.post(`/api/goals/${goal._id}/share/private`, { sharedWith });
      toast.success('Goal shared privately!');
    } catch (error) {
      toast.error('Error sharing goal');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Goals Section */}
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

              {/* Completion Slider */}
              <div className="mt-4">
                <label className="block text-gray-700">Completion: {goal.completionPercentage}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.completionPercentage}
                  onChange={(e) => handleCompletionChange(goal._id, e.target.value)}
                  className="w-full"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Form Section */}
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

      {/* Category Management Buttons */}
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

      <div className="share-options">
        <button onClick={handlePublicShare} className="share-btn">
          Share Publicly
        </button>

        {shareLink && (
          <div>
            <p>Public Link: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a></p>
          </div>
        )}

        <button onClick={() => setShowPrivateShare(true)} className="share-btn">
          Share Privately
        </button>

        {showPrivateShare && (
          <div className="private-share-modal">
            <h4>Share with specific users</h4>
            <input
              type="text"
              value={sharedWith}
              onChange={(e) => setSharedWith(e.target.value.split(','))}
              placeholder="Enter emails separated by commas"
            />
            <button onClick={handlePrivateShare}>Share</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfessionalGoals;
