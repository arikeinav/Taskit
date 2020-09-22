import React, { Component } from 'react'
import { AddImg } from './AddImg';
import { MenuColorModal } from './MenuColorModal'
import { connect } from "react-redux";
import { updateBoard } from "../store/actions/boardActions";
import {Avatar} from '@material-ui/core';

export class _SideMenu extends Component {

state={
    isChooseImg:false,
    isChooseBgc:false,
    
   
}

onChangeBoardImg=()=>{
    this.setState({isChooseImg:true})
}
onChangeBoardColor=()=>{
    this.setState({isChooseColor:true})
}
onBackToMenu=()=>{
    this.setState({isChooseImg:false,isChooseColor:false})
}
onChangeImg=(imgUrl) =>{
    const board = this.props.board
    board.style.bgImg=imgUrl
    board.style.bgColor=''
    this.props.updateBoard(board)
    
}
onChangeColor=(color) =>{
    const board = this.props.board
    board.style.bgColor=color
    board.style.bgImg=''
    this.props.updateBoard(board)
    
}
    

    render(){
        const {activities}=this.props.board
    return (
        <div className="side-menu" >
        <button className="btn" onClick={this.props.onToggleMenu}>X</button>
        <button className="btn" onClick={this.onBackToMenu}>back</button>
         {this.state.isChooseImg && <AddImg isForBoard={true} onAddimg={this.onChangeImg}/>}
         {this.state.isChooseColor && <MenuColorModal onAddColor={this.onChangeColor}/>}
        {!this.state.isChooseImg&&!this.state.isChooseColor&& <div>
        <div className="flex column">
         <button className="btn" onClick={this.onChangeBoardImg}>change board Img</button>
         <button className="btn" onClick={this.onChangeBoardColor}>change board color</button>
        <button className="btn" >delete</button>
        </div>
       {activities&& <div>
        <ul className="side-menu-list">
        {activities.map(activitie =><li>
        <Avatar key={activitie.byMember._id} src={activitie.byMember.imgUrl}>{activitie.byMember.userName.substring(0, 1).toUpperCase()}
        {activitie.byMember.userName.substring(1, 2).toUpperCase()}</Avatar>{activitie.byMember.userName +' '}{activitie.txt}</li> )}
        </ul></div>}
        
        
        </div>}
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



