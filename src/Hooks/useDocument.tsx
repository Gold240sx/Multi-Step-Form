//This file allows us to get real-time document data
import { useEffect, useState } from "react"
import { db } from '../Firebase/config.js'
import { doc, collection, onSnapshot, setDoc } from 'firebase/firestore'


// similar to use collection. Instead of realtime collection data, we get realtime document data.
export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //realtime data for a document
    useEffect(() => {
        // const ref = db.collection(collection).doc(id)
        const ref = doc(db, collection, doc.id)

        console.log(ref)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                //update document state and reset the error
                setDoc({...snapshot.data(), id: snapshot.id})
                setError(null)
            }
            else { 
                setError('No such document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('Failed to retrieve document')
        })

        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}