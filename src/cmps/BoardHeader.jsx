import React, { Component } from 'react'
// import { FaUserCircle } from "react-icons/fa";
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { AiOutlineMenu } from "react-icons/ai";

import { SideMenu } from './SideBarMenu'
import EditableLabel from 'react-editable-label'
import { BoardInvite } from './BoardInvite'

export class BoardHeader extends Component {

    state = {
        filterBy: '',
        isMenuShow: false,
        isInviteMembersShown: false
    }
    toggleMenu = () => {
        let menuState = !this.state.isMenuShow
        this.setState({ isMenuShow: menuState })
    }
    handleFocusOut = (title) => {
        const board = this.props.board
        board.title = title
        this.props.updateBoard(board)
    }
    onToggleInviteModal = (val) => {
        this.setState({ isInviteMembersShown: val })
    }
    getAvatar(member) {
        if (member && member.imgUrl) {
            return <Avatar key={member._id} src={member.imgUrl} className="avatar" onClick={(ev) => this.removeMemberFromBoard(member._id, ev)}/>
        }
        if (member) {
            return <Avatar key={member._id} className="avatar" onClick={(ev) => this.removeMemberFromBoard(member._id, ev)}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
        }
        return <Avatar className="avatar" onClick={(ev) => this.removeMemberFromBoard(member._id, ev)}/>
    }
    removeMemberFromBoard = (memberId, ev) => {
        ev.stopPropagation()
        const board = this.props.board
        const memberInBoard = board.members.filter(member => member._id !== memberId)
        board.members = memberInBoard
        console.log("BoardHeader -> removeMemberFromBoard -> memberInBoard", memberInBoard)
        // this.updateLocalCard('members', memberInCard)
        this.props.updateBoard(this.props.board)
    }

    render() {
        const { board } = this.props
        return (
            <div className="board-header flex space-between">
                <div className="name-and-member flex">
                <div style={{ marginLeft: "10px", alignSelf: "center",color:"white" }}>  
                            <EditableLabel 
                         initialValue={(board.title)}
                         save={value => {this.handleFocusOut(value)}}
                         inputClass='title-input'
                         labelClass='header-label-class'
                         
                            />
                    </div>

                    {board.members &&
                        <section className="avatar-members flex">
                            <AvatarGroup max={4}>
                                {board.members.map(member => this.getAvatar(member))}
                            </AvatarGroup>
                        </section>}
                </div>
                <div className="flex">

                    <BoardInvite board={board} updateBoard={this.props.updateBoard} />

                    <button className="btn board-header-btn menu flex" onClick={this.toggleMenu}><AiOutlineMenu style={{ margin: "0px 5px -2px" }} />Menu</button>

                    <button className="btn board-header-btn-small-screen menu" onClick={this.toggleMenu}><AiOutlineMenu style={{ marginRight: "5px" }} /></button>
                </div>
                {this.state.isMenuShow && <SideMenu onToggleMenu={this.toggleMenu} />}
            </div>
        )
    }
}
