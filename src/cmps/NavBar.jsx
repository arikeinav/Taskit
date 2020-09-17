import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';

function _NavBar() {
    return (
        <nav className="nav-bar grid align-center">
           <div className="navdiv-s"> <NavLink  to="/">Home</NavLink></div>
           <div className="navdiv-s"><NavLink  to="/board">Boards</NavLink></div>
           <div className="logo">Taskit</div>
           <div className="navdiv-s"> <NavLink to="/board/b123">Test Board</NavLink></div>
            {/* <NavLink className="nav-item" to="/board/bexample">Public Board</NavLink> */}
            <div className="navdiv-s signup">Sign Up</div>
            <div className="navdiv-s login">Login</div>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)
