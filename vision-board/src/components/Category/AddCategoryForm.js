import { useState } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";

function AddCategoryForm({ onCategoryAdded, onClose }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((response) => response.json())
      .then((data) => {
        onCategoryAdded(data);
        setCategoryName('');
        onClose();
      })
      .catch((error) => console.error('Error adding category:', error));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
            <FaRegTimesCircle className="text-xl" />
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryForm;
