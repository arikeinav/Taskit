import React, { Component } from 'react'

import {Avatar} from '@material-ui/core';
import {AvatarGroup} from '@material-ui/lab';

export class BoardHeader extends Component {

    state = {
        filterBy: ''
    }

    async componentDidMount() {

    }

    render() {
        const { board } = this.props
        
        return (
            <div className="board-header flex space-between">
                <div className="board-name">{board.title}</div>

                <section className="avatar-members flex">
                    <AvatarGroup max={3}>
                        {board.members.map(member =>
                            member.imgUrl ?
                                <Avatar key={member._id} asrc={member.imgUrl}></Avatar>
                                :
                                <Avatar key={member._id} src={member.imgUrl}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
                        )}
                    </AvatarGroup>
                </section>

                <div className="flex">
                    <button >Invite</button>
                    <button >Menu</button>
                </div>
            </div>
        )
    }
}
