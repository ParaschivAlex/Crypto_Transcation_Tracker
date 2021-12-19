import { useReducer, useEffect, useState } from "react"
import { prjFirestore, timestamp } from '../firebase/configfirebase' 

let initialState = {
  document: null as null,
  isPending: false,
  error: null as null,
  success: null as null,
}

const firestoreReducer = (state: any, action: any) => {
  switch (action.type) {
    case "IS_PENDING":
      return {success: false, isPending: true, error: null, document: null}
    case "ADDED_DOCUMENT":
      return {success: true, isPending: false, error: null, document: action.payload}
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (collection: any) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = prjFirestore.collection(collection)
  
  const dispatchIfNotCancelled = (action: any) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc: any) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc, createdAt})
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }

  }

  // delete a document
  const deleteDocument = async (id: any) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }

}