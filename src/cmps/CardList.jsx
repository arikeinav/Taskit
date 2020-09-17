import React from 'react'

import { CardPreview } from './CardPreview'
import { AddText } from './AddText'

export class CardList extends React.Component {

    state = {
        isAddCard:false
    }
    onEditCard = () => {
        this.setState({ isAddCard: true })
    }
    doneAddCard = () => {
        this.setState({ isAddCard: false })
    }
    
    render() {
        const group = this.props.group
        return (
            <div className="card-list">
                <header className="flex space-between">
                    <p>{group.title}</p>
                    <button className="btn" onClick={() => this.props.onRemoveGroup(group.id)}>X</button>
                </header>
                {group.cards.map(card => <CardPreview card={card} key={card.id} changeIsDetailsShown={this.props.changeIsDetailsShown} groupId={group.id} />)}
                {this.state.isAddCard ?
                    <AddText onAdd={this.props.onAdd} type="Card" groupId={group.id} doneAddCard={this.doneAddCard}/>
                    :
                    <button onClick={() => this.onEditCard()}>+ Add card</button>
                }
            </div>
        )
    }
}
