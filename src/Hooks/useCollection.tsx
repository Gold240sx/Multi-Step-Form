// React Stuff
import { useState, useEffect } from 'react'

// Firebase / Backend Stuff
import { db } from '../Firebase/config.js'
import { collection, onSnapshot } from 'firebase/firestore'


export const useCollection = (c) => { // c is the collection
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        let ref = collection(db, c)

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setDocuments(results)
        })

        return () => unsub()
    }, [c]);

    return { documents }
}