import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

const Container = styled.div`
background-color: ${props => (props.isDragging ? '#B5B5B5' : 'rgba(255, 255, 255, 0.822)')};
transform: ${props => (props.isDragging ? ' rotate(20deg) 0.2s ease' : 'none')} 
`;

export function CardPreview({ card, updateState, groupId, index }) {

    const openCardDetails = (cardId) => {
        updateState('isDetailsShown', { cardId, groupId })
    }

    return (
        <Draggable draggableId={card.id} index={index} >
            {(provided, snapshot) => (
                <NaturalDragAnimation
                    style={provided.draggableProps.style}
                    snapshot={snapshot}
                >
                    {style =>(
                    <Container  isDragging={snapshot.isDragging} className="card-preview flex column" onClick={() => openCardDetails(card.id)} {...provided.draggableProps} {...provided.dragHandleProps} style={style} ref={provided.innerRef}>
                        {/* <div style={{ backgroundColor: "blue" }}>Labels</div> */}
                        <p className="p-card-preview">{card.title}</p>
                        {card.imgUrl && <img className="img-card-preview" src={card.imgUrl} alt="Loading" />}
                    </Container >
                    )}
                </NaturalDragAnimation>
            )}
        </Draggable>
    )
}
