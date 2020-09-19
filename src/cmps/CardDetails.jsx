import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { ColorModal } from './ColorModal'
import { boardService } from '../services/boardService'
import { AddImg } from './AddImg'
import { updateCard } from '../store/actions/boardActions'

export class _CardDetails extends Component {

    state = {
        card: null,
        isAddImgModalShown: false,
        isColorShown: false,
        isDescriptionEdit: false,
        isTimeEdit: false,
        endTask: new Date()
    }
    async componentDidMount() {
        const card = await boardService.getCardById(this.props.board, this.props.groupId, this.props.cardId)
        this.setState({ card })
    }
    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    onRmoveModal = () => {
        this.saveCard()
        this.props.updateState('isDetailsShown', false)
    }
    onHandleRemove = () => {
        this.onRmoveModal()
        this.props.onRemoveCard(this.state.card.id)
    }
    addImgToCard = (card) => {
        this.props.updateCard(this.props.board, this.props.groupId, card)
    }
    onRemoveImg = () => {
        const card = this.state.card
        delete card.imgUrl
        this.props.updateCard(this.props.board, this.props.groupId, card)
    }
    saveCard = () => {
        this.updateState('isDescriptionEdit', false)
        this.props.updateCard(this.props.board, this.props.groupId, this.state.card)
    }
    doneEdit = () => {
        this.updateState('isDescriptionEdit', false)
        this.saveCard()
    }
    updateLocalCard = (key, val) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                [key]: val
            }
        }))
    }
    onRemoveDueDate = () => {
        this.updateState('isTimeEdit', false)
        this.updateLocalCard('dueDate', "")
        this.saveCard()
    }



    render() {

        if (!this.state.card) return <div>Loading...</div>
        const { card } = this.state
        return (
            <div className="card-modal flex align-center">

                <div className="empty-modal" onClick={this.onRmoveModal}></div>

                <div className="details-modal" onClick={this.doneEdit}>
                    <header className="card-header flex space-between">
                        <h3>{card.title}</h3>
                        <button onClick={this.onRmoveModal}>X</button>
                    </header>
                    <div className="flex space-between">
                        <div className="modal-details-left">
                            <button>Invite</button>
                            <section className="avatar-members flex">
                                {card.assignedMembers &&
                                    <AvatarGroup max={3}>
                                        {card.assignedMembers.map(member => {
                                            return member.imgUrl ?
                                                <Avatar key={member._id} asrc={member.imgUrl}></Avatar>
                                                :
                                                <Avatar key={member._id} src={member.imgUrl}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
                                        }
                                        )}
                                    </AvatarGroup>
                                }
                            </section>
                            
                            {(this.state.isTimeEdit || this.state.card.dueDate) &&
                                <div>
                                    < DatePicker
                                        onChange={date => this.updateLocalCard('dueDate', date)}
                                        selected={this.state.card.dueDate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                    <button onClick={this.onRemoveDueDate} className="btn">X</button>
                                </div>
                            }
                            <div>
                            <div className="flex">
                                
                            </div>
                                <p>description:</p>
                                <textarea
                                    className={this.state.isDescriptionEdit ? "edit-card-description" : "not-edit-card-description"}
                                    value={this.state.card.description ? this.state.card.description : ''}
                                    onChange={(ev) => this.updateLocalCard('description', ev.target.value)}
                                    placeholder="Add a more details description..."
                                    onClick={() => this.updateState('isDescriptionEdit', true)}>
                                </textarea>
                                {this.state.isDescriptionEdit && <button onClick={this.saveCard} className="btn">Save</button>}
                            </div>
                            {card.imgUrl &&
                                <div>
                                    <img className="card-img" src={card.imgUrl} alt="Loading" />
                                    <button onClick={this.onRemoveImg} className="btn">Remove Image</button>
                                </div>
                            }
                        </div>

                        <div className="side-bar-details-right flex column">
                            <button className="btn" onClick={() => this.updateState('isAddImgModalShown', true)}>Add Cover Image</button>
                            <button onClick={this.onHandleRemove} className="btn">Delete Card</button>
                            <button onClick={() => this.updateState('isTimeEdit', true)} className="btn">Due Date</button>
                        </div>

                    </div>
                    {this.state.isAddImgModalShown && <AddImg card={card} updateState={this.updateState} />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {
    updateCard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
