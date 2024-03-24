/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";


const CRMContext = createContext();
function CRMContextProvider({ children }) {
    const [leads, setLeads] = useState([])
    const [notes, setNotes] = useState([])

    const handleRemove = (id) => {
        const deletedLeads = leads.filter(lead => lead.id !== id)
        const deletedNotes = notes.filter(note => note.id != id)
        setLeads(deletedLeads)
        setNotes(deletedNotes)
    }

    useEffect(() => {
        setLeads(localStorage.getItem("leads") ? JSON.parse(localStorage.getItem("leads")) : [])
        setNotes(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [])
    }, [])

    useEffect(() => {
        localStorage.setItem("leads", JSON.stringify(leads))
        localStorage.setItem("notes", JSON.stringify(notes))
    })

    return <CRMContext.Provider value={{ leads, notes, setLeads, setNotes, handleRemove }}>
        {children}
    </CRMContext.Provider>
}

export { CRMContextProvider, CRMContext }
