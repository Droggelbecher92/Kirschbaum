import AuthContext from './AuthContext'
import { useContext, useState } from 'react'
import jwt from 'jsonwebtoken'
import { getToken } from '../Services/api-service'

export default function AuthProvider({ children }) {
  const [token, setToken] = useState()

  const claims = jwt.decode(token)

  const user = claims && {
    userName: claims.sub,
    role: claims.role,
  }

  const login = credentials => getToken(credentials).then(setToken)

  const logout = () => setToken()

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
