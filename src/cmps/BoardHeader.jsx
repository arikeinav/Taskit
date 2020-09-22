import React, { Component } from 'react'
import { FaUserCircle } from "react-icons/fa";
import {Avatar} from '@material-ui/core';
import {AvatarGroup} from '@material-ui/lab';
import { AiOutlineMenu } from "react-icons/ai";
import {SideMenu}from './SideBarMenu'
export class BoardHeader extends Component {

    state = {
        filterBy: '',
        isMenuShow:false
    }

    toggleMenu=()=>{
        let menuState = !this.state.isMenuShow
        this.setState({isMenuShow:menuState})
    }

    async componentDidMount() {

    }

    render() {
        const { board } = this.props
        
        return (
            <div className="board-header grid">
                <div className="board-name BH1">{board.title}</div>

                <section className="BH2 avatar-members flex">
                    <AvatarGroup max={3}>
                        {board.members.map(member =>
                            member.imgUrl ?
                                <Avatar key={member._id} asrc={member.imgUrl}></Avatar>
                                :
                                <Avatar key={member._id} src={member.imgUrl}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
                        )}
                    </AvatarGroup>
                </section>

                
                    <button className="BH3 btn"><FaUserCircle style={{marginRight:"5px"}}/>Invite</button>
                    <button className="BH4 btn" ><AiOutlineMenu style={{marginRight:"5px"}} onClick={this.toggleMenu}/>Menu</button>
                    {this.state.isMenuShow &&<SideMenu onToggleMenu={this.toggleMenu}/>}
                  
                
            </div>
        )
    }
}
