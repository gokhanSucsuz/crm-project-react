/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";


const CRMContext = createContext();
function CRMContextProvider({ children }) {
    const [active, setActive] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [inputFields, setInputFields] = useState([""])
    const [leads, setLeads] = useState([])
    const [notes, setNotes] = useState([])

    const handleRemove = (id) => {
        const deletedLeads = leads.filter(lead => lead.id !== id)
        const deletedNotes = notes.filter(note => note.id != id)
        setLeads(deletedLeads)
        setNotes(deletedNotes)
    }
    const handleEdit = (id) => {
        const editedLead = leads.filter(lead => lead.id == id)
        const editedNote = notes.filter(note => note.id == id)
        setName(editedLead[0].name)
        setLastName(editedLead[0].lastName)
        setPhone(editedLead[0].phone)
        setEmail(editedLead[0].email)

        setInputFields(editedNote[0].notes.map((note) =>
            note))
    }
    const handleUpdate = () => {

    }

    useEffect(() => {
        setLeads(localStorage.getItem("leads") ? JSON.parse(localStorage.getItem("leads")) : [])
        setNotes(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [])
    }, [])

    useEffect(() => {
        localStorage.setItem("leads", JSON.stringify(leads))
        localStorage.setItem("notes", JSON.stringify(notes))
    })

    return <CRMContext.Provider value={{ active, setActive, name, setName, setLastName, setPhone, setEmail, setInputFields, lastName, phone, email, inputFields, leads, notes, setLeads, setNotes, handleRemove, handleEdit, handleUpdate }}>
        {children}
    </CRMContext.Provider>
}

export { CRMContextProvider, CRMContext }
