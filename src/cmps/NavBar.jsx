import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

function _NavBar() {
    return (
        <nav className="nav-bar flex">
            <NavLink className="nav-item" to="/">Home</NavLink>
            <NavLink className="nav-item" to="/board">Boeards</NavLink>
            {/* <NavLink className="nav-item" to="/board/bexample">Public Board</NavLink> */}
            <div className="nav-item">Loginnnnnnn</div>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)
