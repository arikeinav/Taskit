import React, { Component } from 'react'
import { AddImg } from './AddImg';
import { Graph } from './Graph';
import { MenuColorModal } from './MenuColorModal'
import { connect } from "react-redux";
import { updateBoard } from "../store/actions/boardActions";
// import { Avatar } from '@material-ui/core';
import { VscChromeClose } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { FaFileImage,FaTrashAlt } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { BsListNested,BsCardHeading } from "react-icons/bs";

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

        if(!this.state.isChooseImg && !this.state.isChooseColor) {
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
        console.log('hey');
        this.setState({ idGraphShown: true })
    }


    render() {
        const { activities } = this.props.board
        // const { board } = this.props
        return (
            <div className="side-menu" >
                <Element style={{
                    height: 'calc(100vh - 50px)',
                    width: '100%',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    paddingLeft: '5px'
                }}>
                    <div className="menu-header flex space-between"> <IoIosArrowBack onClick={this.onBackToMenu} />
                        <span style={{ color: 'black' }}>Menu</span> <VscChromeClose onClick={this.props.onToggleMenu} />
                    </div>

                    <hr />
                    {this.state.isChooseImg && <AddImg isForBoard={true} onAddimg={this.onChangeImg} />}
                    {this.state.isChooseColor && <MenuColorModal onAddColor={this.onChangeColor} />}
                    {!this.state.isChooseImg && !this.state.isChooseColor && <div>
                        <div className="menu-actions flex column">
                            <div className="menu-action flex" ><BsCardHeading /><span>Change Name</span></div>
                            <div className="menu-action flex" onClick={this.onChangeBoardImg}><FaFileImage /><span>Change board Img</span></div>
                            <div className="menu-action flex" onClick={this.onChangeBoardColor}><MdColorLens /><span>Change board color</span></div>
                            <div className="menu-action flex" ><FaTrashAlt/><span>Delete</span></div>
                            
                        </div>
                        <hr />
                        <div className="menu-action flex" onClick={this.onOpenGraph}>Graph</div>
                        {this.state.idGraphShown &&
                            <Graph />
                        }
                        <hr />


                        <div className="activity-log flex align-center"><BsListNested /><span> Activity</span></div>
                        {activities && <div>
                            <ul className="side-menu-list">
                                {activities.map(activity =>
                                    <li key={activity.id}>
                                        <div className="one-activity">
                                            <p>{activity.title}</p>
                                            <p>{activity.propertyTitle}</p>

                                        </div>
                                        {/* <Avatar key={activity.byMember._id} src={activity.byMember.imgUrl}>{activity.byMember.userName.substring(0, 1).toUpperCase()}
                                        {activity.byMember.userName.substring(1, 2).toUpperCase()}</Avatar>{activity.byMember.userName + ' '}{activity.txt} */}
                                    </li>)}
                            </ul>
                        </div>}


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



