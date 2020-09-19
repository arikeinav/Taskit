import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'


const Container = styled.div`
background-color: ${props => (props.isDragging ? '#B5B5B5' : 'rgba(255, 255, 255, 0.822)')}
`;

export function CardPreview({ card, updateState, groupId, index }) {

    const openCardDetails = (cardId) => {
        updateState('isDetailsShown', { cardId, groupId })
    }

    return (
        <Draggable draggableId={card.id} index={index} >
            {(provided, snapshot) => (
                <Container isDragging={snapshot.isDragging} className="card-preview flex column" onClick={() => openCardDetails(card.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {/* <div style={{ backgroundColor: "blue" }}>Labels</div> */}
                    <p className="p-card-preview">{card.title}</p>
                    {card.imgUrl && <img className="img-card-preview" src={card.imgUrl} alt="Loading" />}
                </Container >
            )}
        </Draggable>
    )
}
