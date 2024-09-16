import React from 'react'
import axios from 'axios'

const GoogleSyncButton = ({goal}) => {
    const syncWithGoogle = async () => {
        try{
            const response = await axios.post(`/api/calendar/sync/${goal._id}`)
            alert('Goal synced with Google Calendar!');
        }catch(error){
            console.error('Error syncing with Google Calendar')
        }
    }

  return (
    <button onClick={syncWithGoogle} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out'>
        Sync with Google Calendar
    </button>
  )
}

export default GoogleSyncButton