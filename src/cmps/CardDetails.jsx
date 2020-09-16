import React, { Component } from 'react'
import { connect } from 'react-redux'

export class CardDetails extends Component {


    onRmoveModal = () => {
        this.props.changeIsDetailsShown(false)
    }

    render() {
        return (
            <div className="card-modal">
                <div className="empty-modal" onClick={this.onRmoveModal}></div>
                <div className="details-modal">
                    <p>{this.props.cardId}</p>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails)
