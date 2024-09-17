import React, {useState, useEffect} from 'react'
import axios from 'axios'

const NotesSection = ({goalId}) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [editingNote, setEditingNote] = useState(null)
    const [editedContent, setEditedContent] = useState('')

    // search notes when the component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`/api/goals/${goalId}`)
                setNotes(response.data.notes)
            } catch (error) {
                console.error('Error fetching notes', error)
            }
        }
        fetchNotes()
    }, [goalId])

    const addNote = async () => {
        try {
            const response = await axios.post(`/api/goals/${goalId}/notes`, { content: newNote})
            setNotes(response.data.notes)
            setNewNote('')
        } catch (error) {
            console.error('Error adding note', error)
        }
    }

    const updateNote = async (noteId) => {
        try {
            const response = await axios.put(`/api/goals/${goalId}/notes/${noteId}`, {content: editedContent})
            setNotes(response.data.notes)
            setEditingNote(null)
            setEditingNote('')
        } catch (error) {
            console.error('Error updating note', error)
        }
    }

    const deleteNote = async (noteId) => {
        try {
            const response = await axios.delete(`/api/goals/${goalId}/notes/${noteId}`)
            setNotes(response.data.notes)
        } catch (error) {
            console.error('Error deleting note', error)
        }
    }

    return (
        <div className='p-4 bg-white rounded shadow-md'>
            <h3 className="mb-4 text-2xl font-semibold">Notes & Journaling</h3>

            <div className="flex flex-col space-y-2">
                <textarea
                    placeholder="Write a new note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                <button
                    onClick={addNote}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Add Note
                </button>
            </div>

            <ul className='mt-6 space-y-4'>
                {notes.map((note) => (
                    <li key={note._id} className='p-4 bg-gray-100 rounded-md shadow'>
                        {editingNote === note._id ? (
                            <>
                                <textarea 
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className='w-full p-2 border rounded-md'
                                />
                                <button 
                                    onClick={() => updateNote(note._id)}
                                    className='px-4 py-2 mt-2 text-white duration-150 ease-in-out bg-green-500 rounded hover:bg-green-600 transtition'
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <p>{note.content}</p>
                                <small className="text-gray-600">Created: {new Date(note.createdAt).toLocaleDateString()}</small>
                                <div className='mt-2 space-x-2'>
                                    <button 
                                        onClick={() => {setEditingNote(note._id); setEditedContent(note.content)}}
                                        className='px-3 py-1 transition duration-150 ease-in-out bg-yellow-500 rounded text-500 white hover:bg-yellow-600'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteNote(note._id)}
                                        className='px-3 py-1 text-white transition duration-150 ease-in-out bg-red-500 rounded hover:bg-red-600'
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
    )
}

export default NotesSection