import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { prjAuth } from '../firebase/configfirebase'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch }: any = useAuthContext()
  const [isCancelled, setIsCancelled] = useState(false)
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // delogare user
      await prjAuth.signOut()
      
      dispatch({ type: 'LOGOUT' })

      //update
      if (!isCancelled){
      setIsPending(false)
      setError(null)
      }
    } 
    catch(err) {
        if (!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}