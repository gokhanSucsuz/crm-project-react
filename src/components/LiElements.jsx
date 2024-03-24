/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Notes from "./Notes";
import { CRMContext } from "../context/CRMContext";

const LiElements = () => {
    const [active, setActive] = useState("")
    const { leads, notes, handleRemove } = useContext(CRMContext)
    const handleClick = (id) => {
        setActive(id)
    }
    return (
        <>
            {
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Notes Count</th>
                                <th scope="col">Process</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {
                                leads.map((lead, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{lead.name}</td>
                                        <td>{lead.lastName}</td>
                                        <td>{lead.phone}</td>
                                        <td>{lead.email}</td>
                                        <td>{notes.map((note, index) => <h3 className="badge text-bg-info rounded-pill fw-bolder text-white" key={index}>{note.id == lead.id ? note.notes.length : ""}</h3>)}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleRemove(lead.id)} type="button" className="btn btn-danger">Delete</button>
                                                <button onClick={() => handleClick(lead.id)} type="button" className="btn btn-warning">Edit</button>
                                                <button onClick={() => handleClick(lead.id)} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Detail</button>
                                            </div>

                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            }
            {/* Modal Start */}


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">


                <div className="modal-dialog">

                    <div className="modal-content">
                        {

                            leads.filter(lead => lead.id == active).map((lead, index) =>

                                <div key={index} className="modal-header">
                                    <h5 className="modal-title">
                                        {lead.name + " " + lead.lastName}
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                            )}
                        <div className="modal-body">
                            <Notes active={active} notes={notes} />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>


            </div>


        </>
    )

};

export default LiElements;