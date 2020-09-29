import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview'
import { AddText } from './AddText'
import styled from 'styled-components'
import { SimpleMenu } from './CardListMenu'
import EditableLabel from 'react-editable-label'
import Scroll from 'react-scroll';
import { updateBoard } from '../store/actions/boardActions'
var Element = Scroll.Element;

const Container = styled.div`
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? '#3493A5' : 'inherit')};
min-height:40px;
`

export class _CardList extends Component {

    state = {
        isAddCard: false,
        isDeleteGroup: false,
        isGroupColor:false

    }


    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    onRemoveGroup = (groupId) => {
        this.props.onRemoveGroup(groupId)
    }
    onShowDeleteTogglle = () => {
        let isDelete = !this.state.isDeleteGroup
        this.setState({ isDeleteGroup: isDelete })
    }
    onShowColorTogglle = () => {
        let isColor = !this.state.isGroupColor
        this.setState({ isGroupColor: isColor })
    }



    handleFocusOut = (groupTitle) => {
        const board = this.props.board
        let groups = Array.from(board.groups)
        const idx = groups.findIndex(group => group.id === this.props.group.id)
        let group = this.props.group
        group.title = groupTitle
        groups.splice(idx, 1, group)
        board.groups = groups
        this.props.updateBoard(board)

    }
    onGroupColorChange = (color) => {
        const board = this.props.board
        let groups = Array.from(board.groups)
        const idx = groups.findIndex(group => group.id === this.props.group.id)
        let group = this.props.group
        group.bgColor = color
        groups.splice(idx, 1, group)
        board.groups = groups
        this.props.updateBoard(board)

    }


  


    calcProgress = (cardId) => {

        const cards = this.props.group.cards
        const card = cards.find(card => card.id === cardId)
        if (card.checklist && card.checklist.todos) {
            const tasks = card.checklist.todos.length
            const doneTasks = (card.checklist.todos.filter(task => task.isDone === true)).length
            return (`${doneTasks}/${tasks}`)
        } return ''

    }
     longTxt (text) {
        const textToShow =(text.length <= 20)? text : text.substring(0,20).trim() + '...';    
            return textToShow
                   
     }


    render() {
        const group = this.props.group
        return (
            <div style={{ backgroundColor: (group.bgColor) ? (group.bgColor) : '#ebecf0' }} className="card-list flex column" id="card-container">
                <header className="card-header flex space-between align-center">
                
                       
                            <EditableLabel 
                         initialValue={(group.title)}
                         save={value => {this.handleFocusOut(value)}}
                         inputClass='title-input'
                         labelClass='my-label-class'
                         
                            />
                  
                  <SimpleMenu style={{widte:'52px'}} onShowColorTogglle={this.onShowColorTogglle} onGroupColorChange={this.onGroupColorChange} isGroupColor={this.state.isGroupColor} isDeleteGroup={this.state.isDeleteGroup} onAddCard={this.updateState} onShowDeleteTogglle={this.onShowDeleteTogglle} onRemove={this.onRemoveGroup} group={group} />
                </header>
                <Element style={{
                    height: 'auto',
                    width: '100%',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    paddingLeft: '8px',
                    paddingRight: '4px'
                }}>

                    <Droppable droppableId={group.id}>
                        {(provided, snapshot) => (

                            <Container ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}>
                                {group.cards.map((card, index) => <CardPreview calcProgress={this.calcProgress} index={index} card={card} key={card.id} updateState={this.props.updateState} groupId={group.id} />)}
                                {provided.placeholder}
                            </Container>
                        )}</Droppable>

                </Element>
                {this.state.isAddCard ?
                   <AddText style={{margin:"0"}} onAdd={this.props.onAdd} type="Card" groupId={group.id} updateState={this.updateState} />
                    :
                    <button className=" add-card-btn" onClick={() => this.updateState('isAddCard', true)}>+ Add card</button>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    board: state.boardReducer.currBoard
})

const mapDispatchToProps = {
    updateBoard,
}

export const CardList = connect(mapStateToProps, mapDispatchToProps)(_CardList)