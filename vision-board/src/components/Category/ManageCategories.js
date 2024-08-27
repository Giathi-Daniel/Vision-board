import {useState, useEffect} from 'react';

function ManageCategories({onCategoryAdded}) {
    const [categories, setCategories] = useState([])
    const [editCategoryId, setEditCategoryId]= useState(null)
    const [editName, setEditName] = useState('')

    useEffect(() => {
        fetch('/api/categories')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching categories:', error))
    }, [])

    const handleEdit = (category) => {
        setEditCategoryId(category._id)
        setEditName(category.name)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()

        fetch(`/api/categories/${editCategoryId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: editName})
        })
        .then(response => response.json())
        .then(() => {
            setEditCategoryId(null)
            setEditName('')

            // refetch categories to update the list
            fetch('/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
        })
        .catch(error => console.error('Error updating category:', error))
    }

    const handleDelete = (id) => {
        fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setCategories(categories.filter(category => category._id !== id))
        })
        .catch(error => console.error('Error deleting category:', error))
    }

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
        <ul className="space-y-4">
            {categories.map((category) => (
                <li key={category._id} className="flex justify-between items-center">
                    {editCategoryId === category._id ? (
                        <form onSubmit={handleEditSubmit} className="flex space-x-2">
                            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                                Save
                            </button>
                        </form>
                    ): (
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
                                    className="bg-redd-500 text-white px-3 py-2 rounded-md"
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

export default ManageCategories;
