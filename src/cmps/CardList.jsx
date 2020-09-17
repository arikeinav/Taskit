import React from 'react'

import { CardPreview } from './CardPreview'

export function CardList({ group, changeIsDetailsShown }) {

    return (
        <div className="card-list">
            <p>{group.title}</p>
            {group.cards.map(card => <CardPreview card={card} key={card.id} changeIsDetailsShown={changeIsDetailsShown} groupId={group.id}/>)}
            <button>+ Add card</button>
        </div>
    )
}
