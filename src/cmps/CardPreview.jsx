import React from 'react'

export function CardPreview({ card, updateState, groupId }) {

    const openCardDetails = (cardId) => {
        updateState('isDetailsShown', {cardId ,groupId})
       }

    return (
        <div className="card" onClick={() => openCardDetails(card.id)}>
            <p>{card.title}</p>
        </div>
    )
}
