import React from 'react'
import { Draggable } from 'react-beautiful-dnd'


export function CardPreview({ card, updateState, groupId, index }) {

    const openCardDetails = (cardId) => {
        updateState('isDetailsShown', { cardId, groupId })
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div className="card" onClick={() => openCardDetails(card.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <p>{card.title}</p>
                </div>
            )}
        </Draggable>
    )
}
