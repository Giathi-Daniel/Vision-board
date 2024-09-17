import React, { useState } from 'react';
import axios from 'axios';

const GoogleSyncButton = ({ goal }) => {
    const [isSyncing, setIsSyncing] = useState(false);
    
    // Redirect user to Google OAuth login
    const redirectToGoogleAuth = () => {
        window.location.href = '/api/calendar/auth/google';
    };

    // Sync goal with Google Calendar
    const syncWithGoogle = async () => {
        setIsSyncing(true); // Start syncing
        try {
            const response = await axios.post(`/api/calendar/sync/${goal._id}`);
            alert('Goal synced with Google Calendar!');
        } catch (error) {
            console.error('Error syncing with Google Calendar:', error);
            alert('Failed to sync with Google Calendar. Please try again.');
        } finally {
            setIsSyncing(false); // End syncing
        }
    };

    return (
        <>
            <button 
                onClick={syncWithGoogle} 
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSyncing}
            >
                {isSyncing ? 'Syncing...' : 'Sync with Google Calendar'}
            </button>
            
            <div className="p-4">
                <h2 className="text-3xl font-bold mb-6">Sync with Google Calendar</h2>
                <button
                    onClick={redirectToGoogleAuth}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150 ease-in-out"
                >
                    Connect Google Calendar
                </button>
            </div>
        </>
    );
};

export default GoogleSyncButton;
