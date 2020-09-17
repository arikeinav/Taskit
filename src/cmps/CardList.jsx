import React from 'react'

import { CardPreview } from './CardPreview'
import { AddText } from './AddText'

export class CardList extends React.Component {

    state = {
        isAddCard:false
    }
    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    
    render() {
        const group = this.props.group
        return (
            <div className="card-list">
                <header className="flex space-between">
                    <p>{group.title}</p>
                    <button className="btn" onClick={() => this.props.onRemoveGroup(group.id)}>X</button>
                </header>
                {group.cards.map(card => <CardPreview card={card} key={card.id} updateState={this.props.updateState} groupId={group.id} />)}
                {this.state.isAddCard ?
                    <AddText onAdd={this.props.onAdd} type="Card" groupId={group.id} updateState={this.updateState}/>
                    :
                    <button onClick={() => this.updateState('isAddCard', true)}>+ Add card</button>
                }
            </div>
        )
    }
}
