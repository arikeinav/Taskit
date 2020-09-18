import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import {ColorModal} from './ColorModal'
import { boardService } from '../services/boardService'
import { AddImg } from './AddImg'
import { updateCard } from '../store/actions/boardActions'

export class _CardDetails extends Component {

    state = {
        card: null,
        isAddImgModalShown: false,
        isColorShown:false,
        isDescriptionEdit: false
    }
    async componentDidMount() {
        const card = await boardService.getCardById(this.props.board, this.props.groupId, this.props.cardId)
        this.setState({ card })
    }
    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    onRmoveModal = () => {
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
    updateTextCard = (key, val) => {
        if(!this.state.card.hasOwnProperty('description')) {
            this.setState(prevState => ({
                card : {
                    ...prevState.card,
                    description: ''
                }
            }))
        }
        this.setState(prevState => ({
            ...prevState,
            [key]: val
        }))
    }

    render() {
        if (!this.state.card) return <div>Loading...</div>
        const { card } = this.state
        return (
            <div className="card-modal flex align-center">

                <div className="empty-modal" onClick={this.onRmoveModal}></div>

                <div className="details-modal">
                    <header className="card-header flex space-between">
                        <h3>{card.title}</h3>
                        <button onClick={this.onRmoveModal}>X</button>
                    </header>
                    <div className="flex">
                        <div className="details-body">
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

                            <div>
                                <p>description:</p>

                                <textarea
                                    onChange={() => this.updateTextCard('card.description', this.state.card.description)}
                                    value={this.state.card.description}
                                    placeholder="Add a more details description..."
                                    onClick={() => this.updateState('isDescriptionEdit', true)}>
                                </textarea>

                                {this.state.isDescriptionEdit && <button onClick={() => this.updateTextCard('card', this.state.card.description)} className="btn">Save</button>}
                            </div>


                            {card.imgUrl &&
                                <div>
                                    <img className="card-img" src={card.imgUrl} alt="Loading" />
                                    <button onClick={this.onRemoveImg} className="btn">Remove Image</button>
                                </div>
                            }
                        </div>
                        <div className="side-bar-details">
                            <button className="btn" onClick={() => this.updateState('isAddImgModalShown', true)}>Add Cover Image</button>
                            <button onClick={this.onHandleRemove} className="btn">Delete Card</button>
                        </div>
                    </div>
                </div>
                { this.state.isAddImgModalShown && <AddImg card={card} updateState={this.updateState} />
                }
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
