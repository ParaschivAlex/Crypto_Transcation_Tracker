import { useState, useEffect } from 'react'
import { prjAuth } from '../firebase/configfirebase' 
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch }: any = useAuthContext()

  const login = async (email: any, password: any) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await prjAuth.signInWithEmailAndPassword(email, password)

      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
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