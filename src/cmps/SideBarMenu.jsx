import React, { Component } from 'react'
import Swal from 'sweetalert2'
// import { BsListNested, BsCardHeading } from "react-icons/bs";
import { Avatar } from '@material-ui/core';
import { VscChromeClose } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { connect } from "react-redux";
import { MdColorLens } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { GoGraph } from "react-icons/go";


// import { createBrowserHistory } from 'history';
import { withRouter } from "react-router";

import { AddImg } from './AddImg';
import { MenuColorModal } from './MenuColorModal'
import { updateBoard } from "../store/actions/boardActions";
import { FaFileImage, FaTrashAlt } from "react-icons/fa";
import { boardService } from '../services/boardService'

import Scroll from 'react-scroll';
var Element = Scroll.Element;

export class _SideMenu extends Component {

    state = {
        isChooseImg: false,
        isChooseBgc: false,
        idGraphShown: false,
    }

    onChangeBoardImg = () => {
        this.setState({ isChooseImg: true })
    }
    onChangeBoardColor = () => {
        this.setState({ isChooseColor: true })
    }
    onBackToMenu = () => {

        if (!this.state.isChooseImg && !this.state.isChooseColor) {
            this.props.onToggleMenu()
            return
        }
        this.setState({ isChooseImg: false, isChooseColor: false })
    }
    onChangeImg = (imgUrl) => {
        const board = this.props.board
        board.style.bgImg = imgUrl
        board.style.bgColor = ''
        this.props.updateBoard(board)

    }
    onChangeColor = (color) => {
        const board = this.props.board
        board.style.bgColor = color
        board.style.bgImg = ''
        this.props.updateBoard(board)
    }
    onOpenGraph = () => {
        this.props.onToggleMenu()
        this.props.history.push(`/graph/${this.props.board._id}`)
    }
    removeAllActivity = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert the activities",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(221 51 51 / 78%)',
            cancelButtonColor: 'rgb(48 133 214 / 83%)',
            confirmButtonText: 'Yes, delete all'
        }).then((result) => {
            if (result.isConfirmed) {
                const board = boardService.removeActivities(this.props.board)
                this.props.updateBoard(board)
            }
        })
    }
    getAvatar(member) {
        if (member && member.imgUrl) {
            return <Avatar key={member._id} src={member.imgUrl} className="avatar" />
        }
        if (member) {
            return <Avatar key={member._id} className="avatar">{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
        }
        return <Avatar className="avatar" />
    }
    onRemoveBoard = async () => {
        const answer = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert the board",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(221 51 51 / 78%)',
            cancelButtonColor: 'rgb(48 133 214 / 83%)',
            confirmButtonText: 'Yes, delete the Board'
        })
        if (answer.isConfirmed) {
            await boardService.removeBoard(this.props.board._id)
            this.props.history.push('/board')
        }
    }

    render() {
        const { activities } = this.props.board
        return (
            <div className="side-menu" >
                <Element style={{
                    height: 'calc(100vh - 60px)',
                    width: '100%',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    paddingLeft: '5px'
                }}>
                    <div className="menu-header flex space-between">
                        <IoIosArrowBack onClick={this.onBackToMenu} />
                        <span style={{ color: 'black' }}>Menu</span>
                        <VscChromeClose onClick={this.props.onToggleMenu} className="close-modal-btn" />
                    </div>

                    <hr />
                    {this.state.isChooseImg && <AddImg isForBoard={true} onAddimg={this.onChangeImg} />}
                    {this.state.isChooseColor && <MenuColorModal onAddColor={this.onChangeColor} />}
                    {!this.state.isChooseImg && !this.state.isChooseColor && <div>
                        <div className="menu-actions flex column">
                            {/* <div className="menu-action flex" ><BsCardHeading /><span>Change Name</span></div> */}
                            <div className="menu-action flex" onClick={this.onChangeBoardImg}><FaFileImage /><span>Change board Img</span></div>
                            <div className="menu-action flex" onClick={this.onChangeBoardColor}><MdColorLens /><span>Change board color</span></div>
                            <div className="menu-action flex" onClick={this.onRemoveBoard}><FaTrashAlt /><span>Delete Board</span></div>

                        </div>
                        <hr />
                        <div className="menu-action flex" onClick={this.onOpenGraph}><GoGraph /><span>Graph</span></div>
                        <hr />
                        <div className="activity-log flex align-center space-between">
                            <div className="flex align-center">
                                <AiOutlineMenu />
                                <span> Activity</span>
                            </div>
                            <p className="delete-activities" onClick={this.removeAllActivity}>Delete all</p>
                        </div>
                        {activities && <div>
                            <ul className="side-menu-list">
                                {activities.map(activity =>
                                    <li key={activity.id} className="one-activity flex">

                                        <span className="user-avatar">{this.getAvatar(activity.byMember)}</span>

                                        <div className="one-activity flex column">

                                            <p>
                                                <span className="user-name">{activity.byMember ? activity.byMember.userName : 'Guest'}</span>
                                                <span className="action-name">{' ' + activity.title}</span>
                                            </p>
                                            <p>Card: {activity.propertyTitle}</p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                        }
                    </div>}
                </Element>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boardReducer.currBoard,
    };
};
const mapDispatchToProps = {
    updateBoard
};

const SideMenuWithRouter = withRouter(_SideMenu)

export const SideMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenuWithRouter);


