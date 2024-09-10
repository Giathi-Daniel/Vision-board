import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import axios from 'axios';

const AddGoalForm = ({ categories, onGoalAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Assuming a POST request to add a new goal
      await axios.post('/api/goals', formData);
      onGoalAdded(); // Refresh or reload goal data
      navigate('/goals'); // Redirect user after successful submission
    } catch (error) {
      console.error('Failed to add goal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-goal-form">
      <h2 className="text-lg font-bold mb-4">Add New Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Goal Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`input ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`input ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className={`input ${errors.dueDate ? 'border-red-500' : ''}`}
          />
          {errors.dueDate && <p className="text-red-500 text-xs">{errors.dueDate}</p>}
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add Goal'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm;
