import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalDetail = ({ match }) => {
    const [goal, setGoal] = useState(null);
    const [notes, setNotes] = useState('');
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await axios.get(`/api/goals/${match.params.id}`);
                setGoal(response.data);
                setJournalEntries(response.data.journalEntries);
            } catch (error) {
                console.error('Error fetching goal details', error);
            }
        };

        fetchGoal();
    }, [match.params.id]);

    const handleAddNote = async () => {
        try {
            const response = await axios.post(`/api/goals/${match.params.id}/notes`, { notes });
            setJournalEntries(response.data.journalEntries);
            setNotes(''); // Reset the input field after adding the note
        } catch (error) {
            console.error('Error adding note', error);
        }
    };

    return (
        <div className='p-6'>
            {goal ? (
                <>
                    <h1 className='mb-4 text-3xl font-bold'>{goal.title}</h1>
                    <p className='mb-4'>{goal.description}</p>

                    <div className='mb-6'>
                        <h2 className='text-xl font-semibold'>Journal Entries</h2>
                        {journalEntries.length > 0 ? (
                            <ul className='pl-5 mt-2 list-disc'>
                                {journalEntries.map((entry, index) => (
                                    <li key={index}>{entry}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No journal entries yet.</p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <h2 className='text-xl font-semibold'>Add a Note</h2>
                        <textarea
                            className='w-full p-2 border rounded-md'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            placeholder='Write your thoughts...'
                        />
                        <button
                            onClick={handleAddNote}
                            className='px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600'
                        >
                            Add Note
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading goal details...</p>
            )}
        </div>
    );
};

export default GoalDetail;
