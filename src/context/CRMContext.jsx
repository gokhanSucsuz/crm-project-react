/* eslint-disable react/prop-types */
import { createContext, useEffect, useRef, useState } from "react";


const CRMContext = createContext();
function CRMContextProvider({ children }) {
    const [active, setActive] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [inputFields, setInputFields] = useState([])
    const [leads, setLeads] = useState([])
    const [notes, setNotes] = useState([])
    const inputRefs = useRef([])
    const [onlyNotes, setOnlyNotes] = useState()
    inputRefs.current = []

    const addToRefs = (ref) => {
        if (ref && !inputRefs.current.includes(ref)) {
            inputRefs.current.push(ref)
        }
        const arr = []
        onlyNotes.map((note, index) => arr[index] = note)
        inputRefs.current.map((input, index) =>
            input.value = arr[index])
    }

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

        editedNote[0].notes.map(((note) => inputRefs.current.value = note))

        setInputFields(editedNote[0].notes)
        setOnlyNotes(editedNote[0].notes)

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

    return <CRMContext.Provider value={{ addToRefs, inputRefs, active, setActive, name, setName, setLastName, setPhone, setEmail, setInputFields, lastName, phone, email, inputFields, leads, notes, setLeads, setNotes, handleRemove, handleEdit, handleUpdate }}>
        {children}
    </CRMContext.Provider>
}

export { CRMContextProvider, CRMContext }
