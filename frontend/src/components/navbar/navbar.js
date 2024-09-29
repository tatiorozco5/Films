import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Films</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/movies">Movies</Link>
                        </li>
                        <li className="nav-item">

                            <Link className="nav-link" to="/tipos">Tipos</Link>
                        </li>
                        <li className="nav-item">

                            <Link className="nav-link" to="/director">Director</Link>
                        </li>
                        <li className="nav-item">

                            <Link className="nav-link" to="/genero">Genero</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
