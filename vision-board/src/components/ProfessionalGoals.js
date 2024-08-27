import {useState, useEffect} from 'react';
import AddCategoryForm from "./Category/AddCategoryForm"
import ManageCategories from "./Category/ManageCategories"

function ProfessionalGoals() {
  const [goals, setGoals] = useState([])
  const [categories, setCategories] = useState([])
  const [newGoal, setNewGoal] = useState({title: '', description: '', category: ''})

  useEffect(() => {
    fetch('/api/goals')
    .then(response => response.json())
    .then(data => setGoals(data))
    .catch(error => console.err('Error fetching goals:', error))

    fetch('/api/categories')
    .then(response => response.json())
    .then(data => setCategories(data))
    .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handleGoalSubmit = (e) => {
    e.preventDefault()

    fetch('/api/goals', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newGoal)
    })
    .then(response => response.json())
    .then(data => {
      setGoals([...goals, data])
      setNewGoal({title: '', description: '', category: ''})
    })
    .catch(error => console.error('Error adding goal:', error))
  }

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory])
}


  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Add New Goal</h2>
        <form onSubmit={handleGoalSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input 
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />  
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            ></textarea>  
          </div>
          <div>
            <label className="block text-gray-700">Title</label>
            <input 
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />  
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select 
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value=""  disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md">
            Add Goal
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <AddCategoryForm onCategoryAdded={handleCategoryAdded} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Goals</h2>
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal._id} className="p-4 border rounded-md bg-white shadow-sm">
              <h3 className="text-lg font-semibold">{goal.title}</h3>
              <p className="text-gray-700">
                {goal.description.length > 100 ? `${goal.description.substring(0, 100)}...` : goal.description}
              </p>
              <span className="block mt-2 text-sm text-gray-600">
                Category: {goal.category || 'UnCategorized'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
        <ManageCategories />
      </div>
    </div>
  );
}

export default ProfessionalGoals;
