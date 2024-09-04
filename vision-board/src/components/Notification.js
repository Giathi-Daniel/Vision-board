import React, { useEffect, useState } from 'react'
import {FaBell} from 'react-icons/fa'
import axios from 'axios'

const Notification = () => {
    const [notifications, setNotifications] = useState([])
    const [shoowPopup, setShowPopup] = useState(false)

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await axios.get('/api/notifications')
            setNotifications(res.data)
        }
        fetchNotifications()
    },[])
    
  return (
    <div className="relative">
        <FaBell size={24} className='text-gray-700 cursor-pointer' onClick={() => setShowPopup(!shoowPopup)}/>
        {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {notifications.length}
            </span>
        )}

        {shoowPopup && (
            <div className='absolute right-0 mt-2 bg-white border shadow-lg rounded-md p-4 w-64 z-50'>
                <h4 className="font-bold text-lg">Notifications</h4>
                <ul className='space-y-2 mt-2'>
                    {notifications.map((notification, index) => (
                        <li key={index} className='text-sm text-gray-700'>
                            {notification.message}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default Notification