/* eslint-disable react/prop-types */

function Notes({ active, notes }) {
    return (
        <>
            {notes.filter(item => item.id == active).map((note) =>
                note.notes.map((item, index5) =>
                    <li key={index5} className="list-group-item"><span className="fw-bolder text-success">
                        Note{index5 + 1}: </span>
                        {
                            item
                        }
                    </li>))}

        </>
    )
}

export default Notes