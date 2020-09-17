import React from 'react'

export function CardPreview({ card, changeIsDetailsShown, groupId }) {

    const openCardDetails = (cardId) => {
        changeIsDetailsShown({cardId ,groupId})
    }

    return (
        <div className="card" onClick={() => openCardDetails(card.id)}>
            <p>{card.title}</p>
        </div>
    )
}
