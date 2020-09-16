import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

function _NavBar() {
    return (
        <nav className="nav-bar flex">
            <NavLink className="nav-item" to="/">Home</NavLink>
            <NavLink className="nav-item" to="/board">Boards</NavLink>
            <NavLink className="nav-item" to="/board/b123">Test Board</NavLink>
            {/* <NavLink className="nav-item" to="/board/bexample">Public Board</NavLink> */}
            <div className="nav-item">Login</div>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)
