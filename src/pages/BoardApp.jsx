
import {BoardList} from '../cmps/BoardList'
import {React}  from 'react'
import { connect } from 'react-redux'



class _BoardApp extends React.Component {

    render(){
    return (
        <div className="board-app">
            <h1>Most popular templates</h1>
            <BoardList boards={this.props.boards}  />


        </div>
    )
    }
}

const mapStateToProps = (state) => ({
    boards:state.boardReducer.boards
})

const mapDispatchToProps = {
    
}
export const BoardApp=  connect(mapStateToProps, mapDispatchToProps)(_BoardApp)

