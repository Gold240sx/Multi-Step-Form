//This file allows us to sign in

// React Stuff
import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext.tsx'

// Firebase / Backend Stuff
import { db, auth } from '../Firebase/config.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, addDoc, setDoc, updateDoc } from 'firebase/firestore'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setError(null)
    setIsPending(true)

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // updateProfile(res.user, { displayName })
      // // console.log(res.user.uid)

      // // create a user document
      // setDoc(doc(db, 'users', res.user.uid), {
      //   online: true,
      //   displayName
      // })

      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (error) {
      if (!isCancelled) {
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}