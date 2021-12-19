import { useEffect, useState, useRef } from "react"
import { prjFirestore } from "../firebase/configfirebase"

export const useCollection = (collection: any, _query: any, _orderBy: any) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = prjFirestore.collection(collection).where(query[0], query[1], query[2]).orderBy(orderBy[0], orderBy[1])
        //do a where to get the transaction list for a specific uid
        //and an order

        //if (orderBy) {
         //   ref = ref.orderBy(orderBy[0], orderBy)
         // }

        const unsubscribe = ref.onSnapshot(snapshot => {
        let results: { id: string }[] = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        });
        
        // update state
        setDocuments(results)
        setError(null)
        }, error => {
        console.log(error)
        setError('Ai gresit ceva gogule...')
        })

        // unsubscribe on unmount
        return () => unsubscribe()

    }, [collection, query, orderBy])

    return { documents, error }
}