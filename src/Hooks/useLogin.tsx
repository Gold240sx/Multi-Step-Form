// React Stuff
import { useState, useEffect } from 'react'

// Firebase / Backend Stuff
import { db, auth } from '../Firebase/config.js'
import { updateDoc, doc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

// import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try{
      // login
      await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {

        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user })

        const docRef = doc(db, "users", res.user.uid)

        updateDoc(docRef, { online: true })
        
        console.log(res.user)

        if (!isCancelled) {
          setIsPending(false)
          setError(null)
        }
      })
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}