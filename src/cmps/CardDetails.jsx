import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { FaUserCircle, FaFileImage,FaTrashAlt } from "react-icons/fa";

// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// import { ColorModal } from './ColorModal'
import { boardService } from '../services/boardService'
import { AddImg } from './AddImg'
import { Checklist } from './Checklist'
import { updateBoard } from '../store/actions/boardActions'

export class _CardDetails extends Component {

    state = {
        card: null,
        isAddImgModalShown: false,
        isColorShown: false,
        isDescriptionEdit: false,
        startDate: new Date()
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
       
        this.props.updateState('isDetailsShown', false)
        this.props.onRemoveCard(this.state.card.id)
    }
  
    onRemoveImg = () => {
       
        const card = this.state.card
        delete card.imgUrl
        this.setState({card:card})
        // this.props.updateCard(this.props.board, this.props.groupId, card)

    }
    saveCard = () => {
        this.updateState('isDescriptionEdit', false)
        // this.props.updateCard(this.props.board, this.props.groupId, this.state.card)
        var cardId = this.state.card.id;
        const newBoard ={...this.props.board}
        const group = newBoard.groups.find(group => group.id === this.props.groupId);
        const cardIdx = group.cards.findIndex(card => card.id === cardId);
        group.cards.splice(cardIdx, 1, this.state.card)
        this.props.updateBoard(newBoard)

    }
    doneEdit = () => {
        this.updateState('isDescriptionEdit', false)
        this.saveCard()
    }
    updateTextCard = (key, val) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                [key]: val
            }
        }))
      
    }
    handleChangeDate = date => {
        this.setState({
            startDate: date
        })
      
    }
    render() {
        if (!this.state.card) return <div>Loading...</div>
        const { card } = this.state
        return (
            <div className="card-modal flex align-center">

                <div className="empty-modal" onClick={this.onRmoveModal}></div>

                <div className="details-modal" >
                    <header className="card-header flex space-between">
                        <h3>{card.title}</h3>
                        <button className="btn btn-card-remove" onClick={this.onRmoveModal}>X</button>
                    </header>
                    <div className="flex space-between">
                        <div className="modal-details-left">
                            <button className="btn btn-invite" > <FaUserCircle style={{marginRight:"5px"}}/> Invite</button>
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

                            <div>
                                <p>description:</p>
                                <textarea
                                    className={this.state.isDescriptionEdit ? "edit-card-description" : "not-edit-card-description"}
                                    value={this.state.card.description ? this.state.card.description : ''}
                                    onChange={(ev) => this.updateTextCard('description', ev.target.value)}
                                    placeholder="Add a more details description..."
                                    onClick={() => this.updateState('isDescriptionEdit', true)}>
                                </textarea>
                                {this.state.isDescriptionEdit && <button onClick={this.saveCard} className="btn">Save</button>}
                            </div>

                            <Checklist />


                            {card.imgUrl &&
                                <div>
                                    <img className="card-img" src={card.imgUrl} alt="Loading" />
                                    <button onClick={this.onRemoveImg} className="btn"><FaTrashAlt style={{marginRight:"5px"}}/> Remove Image</button>
                                </div>
                            }

                        </div>
                        <div className="side-bar-details-right flex column">
                            <button className="btn" onClick={() => this.updateState('isAddImgModalShown', true)}><FaFileImage style={{marginRight:"3px"}}/>Cover Image</button>
                            <button onClick={this.onHandleRemove} className="btn"> <FaTrashAlt style={{marginRight:"5px"}}/>Delete Card</button>
                            <button className="btn"> <FaTrashAlt style={{marginRight:"5px"}}/>Checklist</button>



                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                                showTimeSelect
                                dateFormat="Pp"
                            />



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
    updateBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
