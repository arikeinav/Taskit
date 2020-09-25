import React, { Component } from 'react'
import { AddImg } from './AddImg';
import { Graph } from './Graph';
import { MenuColorModal } from './MenuColorModal'
import { connect } from "react-redux";
import { updateBoard } from "../store/actions/boardActions";
import { Avatar } from '@material-ui/core';
import { VscChromeClose } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { FaFileImage, FaTrashAlt } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { boardService } from '../services/boardService'

import { BsListNested, BsCardHeading } from "react-icons/bs";

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
        this.setState({ idGraphShown: true })
    }

    removeAllActivity = () => {
        const board = boardService.removeActivities(this.props.board)
        this.props.updateBoard(board)
    }
    getAvatar(activity) {
        const member = activity.byMember
        if (member && member.imgUrl) {
            return <Avatar key={member._id} src={member.imgUrl} className="avatar" />
        }
        if (member) {
            return <Avatar key={member._id} className="avatar">{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
        }
        return <Avatar className="avatar" />
    }

    render() {
        const { activities } = this.props.board
        return (
            <div className="side-menu" >
                <Element style={{
                    height: 'calc(100vh - 50px)',
                    width: '100%',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    paddingLeft: '5px'
                }}>
                    <div className="menu-header flex space-between">
                        <IoIosArrowBack onClick={this.onBackToMenu} />
                        <span style={{ color: 'black' }}>Menu</span>
                        <VscChromeClose onClick={this.props.onToggleMenu} className="close-modal-btn"/>
                    </div>

                    <hr />
                    {this.state.isChooseImg && <AddImg isForBoard={true} onAddimg={this.onChangeImg} />}
                    {this.state.isChooseColor && <MenuColorModal onAddColor={this.onChangeColor} />}
                    {!this.state.isChooseImg && !this.state.isChooseColor && <div>
                        <div className="menu-actions flex column">
                            <div className="menu-action flex" ><BsCardHeading /><span>Change Name</span></div>
                            <div className="menu-action flex" onClick={this.onChangeBoardImg}><FaFileImage /><span>Change board Img</span></div>
                            <div className="menu-action flex" onClick={this.onChangeBoardColor}><MdColorLens /><span>Change board color</span></div>
                            <div className="menu-action flex" ><FaTrashAlt /><span>Delete</span></div>

                        </div>
                        <hr />
                        <div className="menu-action flex" onClick={this.onOpenGraph}>Graph</div>
                        {this.state.idGraphShown &&
                            <Graph />
                        }
                        <hr />
                        <div className="activity-log flex align-center space-between">
                            <div>
                                <BsListNested />
                                <span>Activity</span>
                            </div>
                            <p className="delete-activities" onClick={this.removeAllActivity}>Delete all</p>
                        </div>
                        {activities && <div>
                            <ul className="side-menu-list">
                                {activities.map(activity =>
                                    <li key={activity.id} className="one-activity flex">

                                        {this.getAvatar(activity)}

                                        <div className="one-activity">
                                            <p>{activity.title}</p>
                                            <p>Card name: {activity.propertyTitle}</p>

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
export const SideMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(_SideMenu);



