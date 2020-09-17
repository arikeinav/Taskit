import React from 'react'
import { Draggable } from 'react-beautiful-dnd'


export function CardPreview({ card, changeIsDetailsShown, groupId, index }) {

    const openCardDetails = (cardId) => {
        changeIsDetailsShown({ cardId, groupId })
    }

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div className="card" onClick={() => openCardDetails(card.id)} {...provided.draggableProps} {...provided.dragHandleProps} innerref={provided.innerRef}>
                    <p>{card.title}</p>
                </div>
            )}
        </Draggable>
    )
}
