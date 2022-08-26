//This file allows us to logout

// React Stuff
import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Firebase / Backend Stuff
import { auth, db } from '../Firebase/config.js'
import { updateDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

// Javascript Functions


export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try{
      //update online status
      const { uid } = user;

      await signOut(auth)
        .then(() => {
          console.log('user signed out')
          dispatch({ type: 'LOGOUT' })
          const docRef = doc(db, "users", user.uid)
          // console.log(docRef)
          updateDoc(docRef, { online: false })
        })
        .catch((error) => {
          console.log(error.message)
        })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 
    }
    catch(error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}