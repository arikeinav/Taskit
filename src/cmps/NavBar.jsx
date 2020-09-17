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
           <div className="navdiv-s"> <NavLink  to="/">Home</NavLink></div>
           <div className="navdiv-s"><NavLink  to="/board">Boards</NavLink></div>
           <div className="logo">Task<span className="logo-i">i</span>t</div>
           
    {this.state.isLogedShow && <Login />}
    {this.state.isLogedShow && <Submit />}

           <div className="navdiv-s"> <NavLink to="/board/b123">Test Board</NavLink></div>
         
            <div className="navdiv-s signup" onClick={this.onIsSubmitShow}>Sign Up</div>
            <div className="navdiv-s login" onClick={this.onIsLogedShow}>Login</div>
        </nav>
    )
}}

export const NavBar = withRouter(_NavBar)
