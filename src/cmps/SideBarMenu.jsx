import React, { Component } from 'react'
export class SideMenu extends Component {


    

    render(){
    return (
        <div className="side-menu" >
        <div className="flex column">
        <button className="btn" onClick={this.props.onToggleMenu}>X</button>
        <button className="btn">change background</button>
        <button className="btn" >delete</button>
        </div>
        <div>
        <ul className="side-menu-list ">
        <li >active</li>
        <li >active</li>
        <li >active</li>
        <li >active</li>
        <li >active</li>
        <li >active</li>
        <li >active</li>
        <li >active</li>
        </ul>
        </div>
        </div>
    )
    
}
}



