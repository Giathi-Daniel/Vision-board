import React, { useContext, useState } from 'react'
import AuthContext from '../components/AuthContext'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useContext(AuthContext)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
        register(name, email, password).catch(() => setError('Registration failed'))
    }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='w-full max-w-md bg-white p-8 shadow-lg rounded-lg'>
            <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>
            <form onSubmit={handleSubmit} className='space-y-4'> 
                {error && <p className='text-red-500'>{error}</p>}
                <div>
                    <label className='block text-gray-700'>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300' required />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required />
                </div>
                <button type='submit' className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in">Register</button>
            </form>
        </div>
    </div>
    
  )
}

export default Register