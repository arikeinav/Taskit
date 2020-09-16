import React, { Component } from 'react'
import { connect } from 'react-redux'

export class CardDetails extends Component {
    render() {
        return (
            <div className="dark-modal">

                <p>{this.props.cardId}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails)
