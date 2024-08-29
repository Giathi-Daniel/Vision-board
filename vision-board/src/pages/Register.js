import React, { useContext, useState } from 'react'
import AuthContext from '../components/AuthContext'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        register(name, email, password)
    }
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit'>Login</button>
    </form>
  )
}

export default Register