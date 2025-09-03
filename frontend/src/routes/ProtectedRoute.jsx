import React from 'react'
import { isAuthenticated } from '../utils/isAuthenticated'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
  return (isAuthenticated()?children:<Navigate to={"/login"}/>
)
}

export default ProtectedRoute