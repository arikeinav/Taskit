import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { CardPreview } from './CardPreview'

export function CardList({ group, changeIsDetailsShown }) {

    return (
        <div className="card-list">
            <p>{group.title}</p>
            <Droppable droppableId={group.id}>
                {provided => (
                    <div ref={provided.innerRef} >
                        {
                            group.cards.map((card,index) =>
                                <CardPreview index={index}  {...provided.droppableProps} card={card} key={card.id} changeIsDetailsShown={changeIsDetailsShown} groupId={group.id} />)
                        }
                        {provided.placeholder}
                    </div>
                )}</Droppable>
            <button>+ Add card</button>
        </div>
    )
}
