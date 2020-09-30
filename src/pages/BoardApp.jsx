import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/BoardList'
import { loadBoards, addBoard } from '../store/actions/boardActions'
import { Modal } from '../cmps/Modal'
import { AddBoard } from '../cmps/AddBoard'

import BoardPreview from '../cmps/BoardPreview'

const templates = require('../services/templateBoards.json')

class _BoardApp extends Component {

    state = {
        isAddBoardShown: false,
        isImgForBoard: false,

    }

    componentDidMount() {
        this.props.loadBoards()
    }

    onShowModal = () => {
        this.setState({ isAddBoardShown: true, isImgForBoard: true })
    }
    onCloseModal = () => {
        this.setState({ isAddBoardShown: false, isImgForBoard: false })
    }

    onSaveBoard = (txt, imgUrl) => {
        this.props.addBoard(txt, imgUrl)
        this.onCloseModal()
    }



    render() {
        const { boards } = this.props
        return (
            <div className="board-app flex column">


                <div className="ba-boards flex align-center fiftyPh hundredPw space-evenly ">
                    <div className=" h1-div thirdyPw flex hundredPh "><h1>Your Boards:</h1></div>

                    <div className="seventyPw flex justify-center"><BoardList boards={boards} onAddBoard={this.onShowModal} />
                    </div>
                </div>


                <div className="ba-templates flex align-center fiftyPh hundredPw space-evenly">
                    <div className=" h1-div thirdyPw flex hundredPh"><h1 >Template Boards:</h1></div>
                <div className="seventyPw flex justify-center">
                    <div dir="rtl" className=" board-list grid templates">
                        {/* board-list grid seventyPw */}
                        {templates.map(template => <BoardPreview board={template} key={template._id} />)}
                    </div>
                    </div>
                </div>
                    {this.state.isAddBoardShown && <Modal onClose={this.onCloseModal}
                        children={<AddBoard isForBoard={this.state.isImgForBoard} saveBoard={this.onSaveBoard} onClose={this.onCloseModal} />} />}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardReducer.boards,
    }
}

const mapDispatchToProps = {
    loadBoards,
    addBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)


