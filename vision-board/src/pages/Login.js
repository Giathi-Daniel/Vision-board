import React, { useContext, useState } from 'react'
import AuthContext from '../components/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

  return (
    <form onSubmit={handleSubmit}>
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

export default Login