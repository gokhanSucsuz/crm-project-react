import { NavLink } from "react-router-dom"

function Navbar() {


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-info rounded-3 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="#">*** CRM Project ***</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/" className="nav-link text-light">Home</NavLink>
                            <NavLink to="/list-detail" className="nav-link text-light">List Detail</NavLink>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar