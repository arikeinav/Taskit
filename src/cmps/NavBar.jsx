import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

function _NavBar() {
    return (
        <nav className="nav-bar grid align-center">
           <div className="navdiv-s"> <NavLink className="nav-item" to="/">Home</NavLink></div>
           <div className="navdiv-s"><NavLink className="nav-item" to="/board">Boards</NavLink></div>
           <div className="logo">Taskit</div>
           <div className="navdiv-s"> <NavLink className="nav-item" to="/board/b123">Test Board</NavLink></div>
            {/* <NavLink className="nav-item" to="/board/bexample">Public Board</NavLink> */}
            <div className="navdiv-s nav-item">Login</div>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)
