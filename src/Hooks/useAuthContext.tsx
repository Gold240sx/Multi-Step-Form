//This file allows us to use Auth Context in our project

import { AuthContext } from "../CONTEXT/AuthContext.js"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}