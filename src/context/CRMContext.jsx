/* eslint-disable react/prop-types */
import { createContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

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
    inputRefs.current = []

    const [activeRecord, setActiveRecord] = useState("")
    const [editCount, setEditCount] = useState(0)
    const [onlyNotes, setOnlyNotes] = useState([])
    const [value, setValue] = useState([])
    const addNewNoteBtn = useRef()
    const addNewLeadBtn = useRef()
    const updateBtn = useRef()

    function handleRemove(id) {
        const deletedLeads = leads.filter(lead => lead.id !== id)
        const deletedNotes = notes.filter(note => note.id !== id)
        setLeads(deletedLeads)
        setNotes(deletedNotes)
    }

    const addNewLead = (e) => {
        e.preventDefault();
        const newLead = {
            id: activeRecord != "" ? activeRecord : uuidv4(),
            name: name,
            lastName: lastName,
            phone: phone,
            email: email
        }
        const newNote = {
            id: newLead.id,
            notes: inputFields,
        }

        setLeads([...leads, newLead])
        setNotes([...notes, newNote])

        setName("")
        setLastName("")
        setPhone("")
        setEmail("")
        setInputFields([])
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        leads.map(lead => {
            if (lead.id == activeRecord) {
                lead.name = name;
                lead.lastName = lastName;
                lead.phone = phone;
                lead.email = email;
            }
        })
        addNewNoteBtn.current.removeAttribute("disabled", false)
        updateBtn.current.classList.add("d-none")
        setName("")
        setLastName("")
        setPhone("")
        setEmail("")
        setInputFields([])
        setActiveRecord("")
    }

    const handleEdit = (id) => {
        setEditCount(editCount + 1)
        const editedLead = leads.filter(lead => lead.id == id)
        const editedNote = notes.filter(note => note.id == id)
        setName(editedLead[0].name)
        setLastName(editedLead[0].lastName)
        setPhone(editedLead[0].phone)
        setEmail(editedLead[0].email)
        setInputFields(editedNote[0].notes)
        setOnlyNotes(editedNote[0].notes)
        addNewNoteBtn.current.setAttribute("disabled", true)
        updateBtn.current.classList.remove("d-none")
        setActiveRecord(id)
    }
    useEffect(() => {
        refsToWrite()
    }, [editCount])

    const addToRefs = (ref) => {
        if (ref && !inputRefs.current.includes(ref)) {
            inputRefs.current.push(ref)
        }

    }

    const refsToWrite = () => {
        const arr = []
        onlyNotes.map((note, index) => arr[index] = note)
        setValue(arr)
    }

    useEffect(() => {
        setLeads(localStorage.getItem("leads") ? JSON.parse(localStorage.getItem("leads")) : [])
        setNotes(localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [])
    }, [])

    useEffect(() => {
        localStorage.setItem("leads", JSON.stringify(leads))
        localStorage.setItem("notes", JSON.stringify(notes))

    })

    return <CRMContext.Provider value={{
        value, setValue, addToRefs, inputRefs, active, setActive, name, setName, setLastName, setPhone, setEmail, setInputFields, lastName, phone, email, inputFields, leads, notes, setLeads, setNotes, handleRemove, handleEdit, handleUpdate, addNewNoteBtn, addNewLeadBtn, updateBtn, activeRecord, setActiveRecord, addNewLead
    }}>
        {children}
    </CRMContext.Provider>
}

export { CRMContextProvider, CRMContext }
