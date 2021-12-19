//https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { createContext, useReducer, useEffect } from 'react'
//import * as React from 'react'
import { prjAuth } from '../firebase/configfirebase'
export const AuthContext = createContext('')
//export const AuthContext = React.createContext()

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'ALREADY_LOGGED':
            return { ...state, user: action.payload, alreadyLogged: true }
        default:
            return state
  }
}

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    alreadyLogged: false
  })
  
  useEffect(() => {
    const unsub = prjAuth.onAuthStateChanged(user => {
      dispatch({ type: 'ALREADY_LOGGED', payload: user })
      unsub()
    })
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}