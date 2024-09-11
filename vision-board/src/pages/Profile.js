import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Unauthorized');
                return;
            }
            try {
                const res = await axios.get('/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(res.data);
            } catch (err) {
                setError('Failed to fetch profile');
            }
        };

        fetchProfile();
    }, [])

    if (error) return <p className="text-red-500">{error}</p>;

    if (!profile) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-8">
        <div className="bg-white shadow-md p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <div className="text-center mt-6">
                <img src="/images/profile-avatar.png" alt="Profile avatar" className="w-24 mx-auto rounded-full" />
            </div>
        </div>
    </div>
  )
}

export default Profile