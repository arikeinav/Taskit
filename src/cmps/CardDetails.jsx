import React, { Component } from 'react'
import { connect } from 'react-redux'

import {boardService} from '../services/boardService'

export class _CardDetails extends Component {

    async componentDidMount() {
        const card = await boardService.getCardById(this.props.board ,this.props.groupId ,this.props.cardId)
        console.log("componentDidMouaaaaaaaaaaaaaaaant -> card", card)
    }
    


    onRmoveModal = () => {
        this.props.changeIsDetailsShown(false)
    }

    render() {
        return (
            <div className="card-modal">
                <div className="empty-modal" onClick={this.onRmoveModal}></div>
                <div className="details-modal">
                    <p>description:</p>
                    <p>{this.props.description}</p>
                    {/* {console.log("render -> style.bgColor", this.props.style.bgColor)}
                    <p>{this.props.style.bgColor}</p>
                    <p>{this.props.cardId}</p>
                    <p>{this.props.cardId}</p> */}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    board: state.boardReducer.currBoard
}}
const mapDispatchToProps = {

}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
