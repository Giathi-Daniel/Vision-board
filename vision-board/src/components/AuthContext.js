import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const decoded = jwtDecode(token)
            setUser({ userId: decoded.userId })
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', {email, password})
        const token = res.data.token
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        setUser({ userId: decoded.userId })
    }

    const register = async (name, email, password) => {
        const res = await axios.post('/api/auth/register', { name, email, password })
        const token = res.data.token
        localStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        setUser({ userId: decoded.userId })
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext