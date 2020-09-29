import React from "react";

export class MenuColorModal extends React.Component {
    onSelectColor = (color, ev) => {
        ev.stopPropagation()
        this.props.onAddColor(color)

    }


    render() {
        const colors = [
            '#00ffab',
            '#3EB650',
            '#5784BA',
            '#37667E',
            '#E5BACE',
            '#913f92',
            '#ffd5cd',
            '#EF0D50',
            '#eaff7b',
            '#FCC133',
        ]
        return (
            <div className="board-menu-color-container">

                {colors.map(color => <span onClick={(ev) => this.onSelectColor(color, ev)} className="color-preview" style={{ backgroundColor: color }} />)}
            </div>

        )
    }
}