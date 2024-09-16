import React from 'react'
import axios from 'axios'

const GoogleSyncButton = ({goal}) => {
    const redirectToGoogleAuth = () => {
        window.location.href = '/api/calendar/auth/google';
    }

    const syncWithGoogle = async () => {
        try{
            const response = await axios.post(`/api/calendar/sync/${goal._id}`)
            alert('Goal synced with Google Calendar!');
        }catch(error){
            console.error('Error syncing with Google Calendar')
        }
    }

  return (
    <>
        <button onClick={syncWithGoogle} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out'>
            Sync with Google Calendar
        </button>
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Sync with Google Calendar</h2>
            <button
                onClick={redirectToGoogleAuth}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Connect Google Calendar
            </button>
        </div>
    </>
  )
}

export default GoogleSyncButton