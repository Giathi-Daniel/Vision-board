import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddCategoryForm from './Category/AddCategoryForm';
// import SocialShare from './SocialShare';

function ProfessionalGoals() {
  const [goals, setGoals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', category: '' });
  const [showModal, setShowModal] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [sharedWith, setSharedWith] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state for feedback

  // Fetch goals and categories data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const goalsRes = await axios.get('/api/goals');
        const categoriesRes = await axios.get('/api/categories');
        setGoals(goalsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch goals or categories');
      }
    };
    fetchData();
  }, []);

  // Handle goal form submission
  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/goals', newGoal);
      setGoals([...goals, response.data]);
      setNewGoal({ title: '', description: '', category: '' }); // Reset form
      toast.success('New goal added successfully');
    } catch (error) {
      console.error('Error adding goal:', error);
      toast.error('Failed to add goal');
    } finally {
      setLoading(false);
    }
  };

  // Handle goal progress update
  const handleCompletionChange = async (goalId, newPercentage) => {
    try {
      const response = await axios.put(`/api/goals/${goalId}/completion`, { completionPercentage: newPercentage });
      setGoals(goals.map(goal => (goal._id === goalId ? response.data : goal)));
      toast.success('Goal progress updated!');
    } catch (error) {
      toast.error('Error updating goal progress');
    }
  };

  // Public goal sharing handler
  const handlePublicShare = async (goalId) => {
    try {
      const response = await axios.post(`/api/goals/${goalId}/share/public`);
      setShareLink(response.data.shareableLink);
      toast.success('Goal shared publicly!');
    } catch (error) {
      toast.error('Error sharing goal publicly');
    }
  };

  // Private goal sharing handler
  const handlePrivateShare = async (goalId) => {
    try {
      await axios.post(`/api/goals/${goalId}/share/private`, { sharedWith });
      toast.success('Goal shared privately!');
    } catch (error) {
      toast.error('Error sharing goal privately');
    }
  };

  // Add new category handler
  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Goals List */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Professional/Career Goals</h2>
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal._id} className="p-4 border rounded-md bg-white shadow-sm">
              <h3 className="text-lg font-semibold">{goal.title}</h3>
              <p className="text-gray-700">{goal.description.length > 100 ? `${goal.description.substring(0, 100)}...` : goal.description}</p>
              <span className="block mt-2 text-sm text-gray-600">Category: {goal.category || 'Uncategorized'}</span>

              {/* Goal Progress */}
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

              {/* Sharing Buttons */}
              <div className="mt-4">
                <button
                  onClick={() => handlePublicShare(goal._id)}
                  className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Share Publicly
                </button>

                {shareLink && (
                  <div>
                    <p>
                      Public Link: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setUpdatingGoal(goal._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Share Privately
                </button>

                {updatingGoal === goal._id && (
                  <div className="private-share-modal mt-2">
                    <input
                      type="text"
                      value={sharedWith}
                      onChange={(e) => setSharedWith(e.target.value.split(','))}
                      placeholder="Enter emails separated by commas"
                      className="input"
                    />
                    <button onClick={() => handlePrivateShare(goal._id)} className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md">
                      Share
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Goal Form */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Goal</h2>
        <form onSubmit={handleGoalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              className="input"
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
              className="textarea"
              required
            ></textarea>
          </div>

          <div className="col-span-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding...' : 'Add Goal'}
            </button>
          </div>
        </form>
      </div>

      {/* Category Management and Modal */}
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
