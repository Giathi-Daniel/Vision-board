import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token')
            const res = await axios.get('/api/auth/profile', {
                headers: {Authorization: token}
            })
            setProfile(res.data)
        }

        fetchProfile()
    }, [])

    if(!profile) return <p>Loading...</p>

  return (
    <div>
        <h2>Profile</h2>
        <p>Name: {Profile.name}</p>
        <p>Email: {Profile.email}</p>
    </div>
  )
}

export default Profile