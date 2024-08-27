import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddCategoryForm({onCategoryAdded}) {
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/categories', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            setName('')
            onCategoryAdded(data)
        })
        .catch(error => console.error('Error adding category:', error))
    }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
        <label ckassName="block text-gray-700 mb-2">Category Name</label>
        <TextField variant="standard" value={name} onChange={(e) => setName(e.target.value)} className="w-full" required />
        <Button variant="contained">
            Add Category
        </Button>
    </form>
  );
}

export default AddCategoryForm;
