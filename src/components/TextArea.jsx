/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { CRMContext } from '../context/CRMContext'
import { useContext, useState } from "react";


function TextArea({ index, inputField, handleValueChange, value }) {
    const { addToRefs, activeRecord, notes } = useContext(CRMContext)


    return (
        <textarea key={index} ref={() => addToRefs()} className="form-control" placeholder="Leave a comment here" maxLength={512} style={{ height: 100 }} value={value[index]}
            onChange={() => handleValueChange(index)} />
    )
}

export default TextArea