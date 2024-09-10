import { useState, useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories([...categories, data]);
        setCategoryName('');
        setIsAdding(false);
      })
      .catch((error) => console.error('Error adding category:', error));
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setEditName(category.name);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/categories/${editCategoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName }),
    })
      .then((response) => response.json())
      .then(() => {
        setEditCategoryId(null);
        setEditName('');
        fetchCategories(); 
      })
      .catch((error) => console.error('Error updating category:', error));
  };

  const handleDelete = (id) => {
    fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((error) => console.error('Error deleting category:', error));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Category Management</h2>

      {/* Add Category Form */}
      {isAdding ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsAdding(false)}
          ></div>

          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-10">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <FaRegTimesCircle className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory}>
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
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Category
        </button>
      )}

      {/* Manage Categories */}
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center">
            {editCategoryId === category._id ? (
              <form onSubmit={handleEditSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManagement;
