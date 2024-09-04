import React, { useState } from 'react'
import axios from 'axios'


const AddGoalForm = ({onGoalAdded}) => {
  const [goal, setGoal] = useState({title: '', description: '', category: '', reminderDate: ''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/goals', goal)
    onGoalAdded(res.data)
    setGoal({title: '', description: '', category: '', reminderDate: ''})
  } 
  
  return (
   <form onSubmit={handleSubmit} className='sapce-y-4'>
        <input
        type="text"
        value={goal.title}
        onChange={(e) => setGoal({ ...goal, title: e.target.value })}
        placeholder="Goal Title"
        className="w-full p-2 border rounded-md"
        required
      />
      <textarea
        value={goal.description}
        onChange={(e) => setGoal({ ...goal, description: e.target.value })}
        placeholder="Goal Description"
        className="w-full p-2 border rounded-md"
        required
      ></textarea>
      <input
        type="date"
        value={goal.reminderDate}
        onChange={(e) => setGoal({ ...goal, reminderDate: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
        Add Goal
      </button>
   </form>
  )
}

export default AddGoalForm