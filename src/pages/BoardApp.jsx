import React from 'react'
import {BoardList} from '../cmps/BoardList'


export class BoardApp extends React.Component {

    render(){
    return (
        <div className="board-app">
            <h1>Most popular templates</h1>
            <BoardList />


        </div>
    )
    }
}
