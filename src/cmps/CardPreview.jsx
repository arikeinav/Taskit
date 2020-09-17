import React from 'react'

export function CardPreview({ card, updateState, groupId }) {

    const openCardDetails = (cardId) => {
        updateState('isDetailsShown', { cardId, groupId })
    }

    return (
        <div className="card-preview" onClick={() => openCardDetails(card.id)}>
            <p>{card.title}</p>
            {card.imgUrl && <img className="img-caed-preview" src={card.imgUrl} alt="Loading"/>}
        </div>
    )
}
