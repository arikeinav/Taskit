import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import {Login} from './Login'
import {Submit} from './Submit'
import {Modal} from './Modal'

class _NavBar extends React.Component {

    state ={
        isLogedShow:false
    }
onIsLogedShow=()=>{
    this.setState({isLogedShow:true})
}
    render(){
    return (
        <nav className="nav-bar grid align-center">
           <div className="navdiv-s"> <NavLink className="nav-item" to="/">Home</NavLink></div>
           <div className="navdiv-s"><NavLink className="nav-item" to="/board">Boards</NavLink></div>
           <div className="logo">Taskit</div>
           <div className="navdiv-s"> <NavLink className="nav-item" to="/board/b123">Test Board</NavLink></div>
            <div className="navdiv-s nav-item" onClick={this.onIsLogedShow}>Login</div>
            <div className="navdiv-s nav-item" onClick={this.onIsSubmitShow}>Submit</div>
    {this.state.isLogedShow && <Login />}
    {this.state.isLogedShow && <Submit />}

        </nav>
    )
}}

export const NavBar = withRouter(_NavBar)
