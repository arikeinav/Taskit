import React from 'react'

export function CardPreview({card, changeIsDetailsShown}) {

    const openCardDetails = (cardId) => {
        changeIsDetailsShown(card.id)
    }

    return (
        <div className="card" onClick={() => openCardDetails(card.id)}>
            <p>{card.title}</p>
        </div>
    )
}
