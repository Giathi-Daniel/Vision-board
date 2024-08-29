import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from './AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <p>Loading...</p>
  return (
    <Route 
        {...rest}
        render={(props) => 
            user ? <Component {...props} /> : <Redirect to="/" />
        }
    />
  )
}

export default PrivateRoute