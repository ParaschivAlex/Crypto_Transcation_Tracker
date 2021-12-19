//import { isPending } from "@reduxjs/toolkit"
import { useState, useEffect } from "react"
import { prjAuth } from "../firebase/configfirebase"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } :any = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const signup = async (email: any, password: any, displayName: any) => {
        setError(null)
        setIsPending(true)

        try{
            //signup
            const res = await prjAuth.createUserWithEmailAndPassword(email, password)

            if(!res){
                throw new Error('Signup Failed')
            }

            //adaug numele la user
            await res.user.updateProfile({displayName})

            dispatch({ type: 'LOGIN', payload: res.user})

            if (!isCancelled){
            setIsPending(false)
            setError(null)
            }
        }
        catch(err){
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

    return { error, isPending, signup}
}