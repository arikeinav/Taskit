import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview'
import { AddText } from './AddText'
import styled from 'styled-components'

import Scroll from 'react-scroll';
var Element = Scroll.Element;

const Container = styled.div`
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? '#3493A5' : '#EBECF0')}
`

export class CardList extends React.Component {

    state = {
        isAddCard: false
    }
    updateState = (key, val) => {
        this.setState({ [key]: val })
    }

    render() {
        const group = this.props.group
        return (
            <div className="card-list">
                <header className="flex space-between">
                    <p>{group.title}</p>
                    <button className="btn" onClick={() => this.props.onRemoveGroup(group.id)}>X</button>
                </header>
                <Element name="test7" className="element" id="containerElement" style={{
                    // height: '100%',
                    height: '70vh',
                    width: '100%',
                    overflow: 'scroll',
                }}>

                    <Droppable droppableId={group.id}>
                        {(provided, snapshot) => (

                            <Container ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}>
                                {group.cards.map((card, index) => <CardPreview index={index} card={card} key={card.id} updateState={this.props.updateState} groupId={group.id} />)}
                                {provided.placeholder}
                            </Container>
                        )}</Droppable>

                    {this.state.isAddCard ?
                        <AddText onAdd={this.props.onAdd} type="Card" groupId={group.id} updateState={this.updateState} />
                        :
                        <button className="btn" onClick={() => this.updateState('isAddCard', true)}>+ Add card</button>
                    }
                </Element>
            </div>
        )
    }
}
