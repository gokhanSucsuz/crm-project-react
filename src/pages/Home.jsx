/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import LiElements from "../components/LiElements";
import { CRMContext } from "../context/CRMContext";

function Home() {
  const { leads, notes, setLeads, setNotes } = useContext(CRMContext)
  // const [leads, setLeads] = useState([])
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [inputFields, setInputFields] = useState([""])

  const addNewLead = (e) => {
    e.preventDefault();
    const newLead = {
      id: uuidv4(),
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

  const handleRemoveFields = (e, index) => {
    e.preventDefault()
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  // Function to update the value of an input field
  const handleValueChange = (e, index) => {
    const values = [...inputFields];
    values[index] = e.target.value;
    setInputFields(values);
  };
  const addNewNote = (e) => {
    e.preventDefault()
    setInputFields([...inputFields, ""])
  }
  const filterFunc = (filterValue) => {
    Array.from(tbody.children)
      .filter((todo) => !todo.textContent.toLowerCase().includes(filterValue))
      .forEach((todo) => todo.classList.add("filtered"));

    Array.from(tbody.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(filterValue))
      .forEach((todo) => todo.classList.remove("filtered"));
  };
  function filterElement() {
    const filterValue = txtSearch.value.trim().toLowerCase();
    filterFunc(filterValue);
  }

  return (
    <div className="container shadow p-3 my-5 bg-primary-subtle">
      <h3 className="text-center text-info">*** CRM Project ***</h3>
      <div className="container shadow mt-5 py-3">
        <h3 className="text-center text-info">*** Search Area ***</h3>
        <div className="form-floating px-2">
          <input type="text" className="form-control" id="txtSearch" placeholder="Leave a comment here" onKeyUp={filterElement} />
          <label htmlFor="txtName">Search Lead...</label>
        </div>
      </div>
      <div className="container py-5">
        <h3 className="text-center text-info">*** Data Area ***</h3>
        <form className="d-flex flex-wrap shadow p-5 align-items-center justify-content-center rounded-3">
          <div className="col-12 col-md-5">
            <div className="form-floating mb-3 px-2">
              <input type="text" className="form-control" id="txtName" placeholder="Leave a comment here" value={name} onChange={(e) => setName(e.target.value.trim())} />
              <label htmlFor="txtName">Name</label>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="form-floating mb-3 px-2">
              <input type="text" className="form-control" id="txtLastName" placeholder="Leave a comment here" value={lastName} onChange={(e) => setLastName(e.target.value.trim())} />
              <label htmlFor="txtLastName">Last Name</label>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="form-floating mb-3 px-2">
              <input type="tel" className="form-control" id="txtPhone" placeholder="Leave a comment here" value={phone} onChange={(e) => setPhone(e.target.value.trim())} />
              <label htmlFor="txtPhone">Phone Number</label>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="form-floating mb-3 px-2">
              <input type="email" className="form-control" placeholder="Leave a comment here" id="txtEmail" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
              <label htmlFor="txtEmail">Email</label>
            </div>
          </div>

          {
            inputFields.map((inputField, index) => (
              <div className="col-12 col-md-10" key={index}>
                <div className="form-floating pb-3 px-2 position-relative">
                  <textarea className="form-control" id={`note${index + 2}`} placeholder="Leave a comment here" maxLength={512} style={{ height: 100 }} value={inputField.value}
                    onChange={(e) => handleValueChange(e, index)} />
                  <label htmlFor={`note${index + 2}`}>Note</label>
                  <button className="delete-btn btn-close position-absolute top-0 end-0 p-3" onClick={(e) => handleRemoveFields(e, index)}>
                  </button>
                </div>
              </div>
            ))}
          <div className="col-10 col-sm-10 buttons d-flex justify-content-between px-2">
            <button onClick={addNewNote} className="btn btn-sm btn-warning text-white">Add New Note</button>
            <button onClick={addNewLead} className="btn btn-sm btn-success text-white">Add New Lead</button>
          </div>
        </form>
      </div>
      <div className="container py-5 shadow rounded-3">
        <h3 className="text-center text-info">*** List Area ***</h3>
        <ol className="list-group list-group-numbered">
          <LiElements />
        </ol>
      </div>
    </div>
  )
}

export default Home