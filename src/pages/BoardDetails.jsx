import React, { Component } from 'react'
import { connect } from 'react-redux'


import { GroupList } from '../cmps/GroupList'
// import {  } from '../store/actions/boardActions'
import { BoardHeader } from '../cmps/BoardHeader'

export class BoardDetails extends Component {
    render() {
        // const {board} = this.props
        return (
            <div className="board-details">
                <BoardHeader />
                {/* <BoardHeader board={board}/> */}
                {/* {board.groups.map(group => <CardList group={group} />)} */}
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     board: state.boardReducer.currBoard

// })

// const mapDispatchToProps = {
 
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BoardDetails)
