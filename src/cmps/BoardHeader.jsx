import React, { Component } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { AiOutlineMenu } from "react-icons/ai";
import { SideMenu } from './SideBarMenu'
import EditableLabel from 'react-inline-editing'
export class BoardHeader extends Component {

    state = {
        filterBy: '',
        isMenuShow: false,
        
    }
     componentDidMount() {

    }
    componentWillUnmount(){
        
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

   

    render() {
        const { board } = this.props
        if (board === null) return <div>Loading...</div>

        return (
            <div className="board-header flex space-between">
                <div className="flex">
                   
                  <div style={{marginLeft:"10px", alignSelf:"center"}}>  <EditableLabel text={board.title}  onFocusOut={this.handleFocusOut}
                            inputWidth='200px'
                            inputHeight='34px'
                            cursor='pointer'
                            inputFontWeight='400' />
</div>
                    {board.members &&
                        <section className="BH2 avatar-members flex">
                            <AvatarGroup max={3}>
                                {board.members.map(member =>
                                    member.imgUrl ?
                                        <Avatar key={member._id} src={member.imgUrl} />
                                        :
                                        <Avatar key={member._id} src={member.imgUrl}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
                                )}
                            </AvatarGroup>
                        </section>}
                </div>
                <div className="flex">
                    <button className="BH3 btn board-header-btn flex"><FaUserCircle style={{ margin: "0px 5px -2px" }} />Invite</button>
                    <button className="BH4 btn board-header-btn menu flex" onClick={this.toggleMenu}><AiOutlineMenu style={{ margin: "0px 5px -2px" }}/>Menu</button>

                    <button className="BH3 btn board-header-btn-small-screen"><FaUserCircle style={{ marginRight: "5px" }} /></button>
                    <button className="BH4 btn board-header-btn-small-screen menu" onClick={this.toggleMenu}><AiOutlineMenu style={{ marginRight: "5px" }}/></button>
                </div>
                {this.state.isMenuShow && <SideMenu onToggleMenu={this.toggleMenu}/>}


            </div>
        )
    }
}
