import React, { useContext, useState } from 'react'
import AuthContext from '../components/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password) {
            setError('Please fill in all fields')
            return;
        }
        login(email, password).catch(() => setError('Invalid credentials'))
    }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='w-full max-w-md bg-white p-8 shadow-lg rounded-lg'>
            <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {error && <p className='text-red-500'>{error}</p>}
                <div>
                    <label className='block text-gray-700'>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ' required />
                </div>
                
                <div>
                    <label className='block text-gray-700'>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300' required />
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-500 transition'>Login</button>
            </form>
            <div className="text-center mt-4">
                <img src='https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_1280.jpg' className='mx-auto w-32' alt='Login illustration' />
            </div>
        </div>
    </div>
  )
}

export default Login