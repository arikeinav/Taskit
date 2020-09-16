import React, { Component } from 'react'
import { connect } from 'react-redux'

// import Avatar from '@material-ui/core/Avatar';


export class BoardHeader extends Component {
    
    state = {
        bord: {}
    }

    async componentDidMount() {
        const bord = await require('../data.json').board
        console.log("BoardHeader -> componentDidMount -> bord", bord)
        this.setState({bord})
    }

    
    render() {
        return (
            <div className="board-header flex">
            <p>gggg</p>
                {/* <p>{this.state.board.title}</p> */}
                <section className="avatar-members flex">
                    {/* {this.state.board.members.map(member =>{
                    <Avatar alt={member.userName} src={member.imgUrl}  />
                })} */}
                    {/* <Avatar alt="Shahar" src="" >SK</Avatar>
                    <Avatar alt="Arik" src="" >SS</Avatar>
                    <Avatar alt="Shlomi">AE</Avatar> */}

                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // board = state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader)
