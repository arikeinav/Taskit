import React, { Component } from 'react'

// import Avatar from '@material-ui/core/Avatar';

export class BoardHeader extends Component {

    state = {
        filterBy: ''
    }

    async componentDidMount() {

    }

    render() {
        return (
            <div className="board-header flex space-between">
                <p lassName="board-name">Board Name</p>
                {/* <div className="board-name">{this.props.board.title}</div> */}
                <section className="avatar-members flex">
                    <p>Members:</p>
                    {/* {this.props.board.members.map(member =>{
                    <Avatar alt={member.userName} src={member.imgUrl}  />
                })} */}
                    {/* <Avatar alt="Shahar" src="" >SK</Avatar>
                    <Avatar alt="Arik" src="" >SS</Avatar>
                    <Avatar alt="Shlomi">AE</Avatar> */}
                </section>
                <div className="flex">
                    <button >Invite</button>
                    <button >Menu</button>
                </div>
            </div>
        )
    }
}
