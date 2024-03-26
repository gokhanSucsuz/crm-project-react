/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import LiElements from "../components/LiElements";
import { CRMContext } from "../context/CRMContext";
import TextArea from "../components/TextArea";

function Home() {
  const { inputRefs, setInputRefs, handleUpdate, updateBtn, addNewNoteBtn, addNewLeadBtn, value, setValue, addToRefs, name, lastName, phone, email, inputFields, setName, setLastName, setPhone, setEmail, setInputFields, leads, notes, setLeads, setNotes, activeRecord, addNewLead } = useContext(CRMContext)

  let values = ""
  const handleValueChange = (index) => {
    values = [...inputFields];
    setValue(values[index])
    setInputFields(values);
  };

  const handleRemoveFields = (e, index) => {
    e.preventDefault()
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const addNewNote = (e) => {
    e.preventDefault()
    setInputFields([...inputFields, { value: "" }])
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
  console.log(activeRecord)
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
              <div className="inputs col-12 col-md-10" key={index}>
                <div className="form-floating pb-3 px-2 position-relative">
                  <TextArea index={index} inputField={inputField} value={value} handleValueChange={handleValueChange} />
                  <label htmlFor={`note${index + 2}`}>Note</label>
                  <button className="delete-btn btn-close position-absolute top-0 end-0 p-3" onClick={(e) => handleRemoveFields(e, index)}>
                  </button>
                </div>
              </div>
            ))}
          <div className="col-10 col-sm-10 buttons d-flex justify-content-between px-2">
            <button ref={addNewNoteBtn} onClick={addNewNote} className="btn btn-sm btn-warning text-white">Add New Note</button>
            <button ref={updateBtn} onClick={handleUpdate} className="btn d-none btn-sm btn-success text-white">Update Lead Info</button>
            <button ref={addNewLeadBtn} onClick={addNewLead} className="btn btn-sm btn-success text-white">Add New Lead</button>
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