import React from "react";

export class MenuColorModal extends React.Component {
    onSelectColor = (color, ev) => {
        ev.stopPropagation()
        this.props.onAddColor(color)

    }


    render() {
        const colors = [
            '#fed766',
            '#eec9d2',
            '#6497b1',
            '#851e3e',
            '#d11141',
            '#5e5656',
            '#ffefd7',
            '#8874a3',
            '#cc2b5e',
        ]
        return (
            <div className="board-menu-color-container">

                {colors.map(color => <span onClick={(ev) => this.onSelectColor(color, ev)} className="color-preview" style={{ backgroundColor: color }} />)}
            </div>

        )
    }
}