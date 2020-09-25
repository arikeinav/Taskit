import React from "react";

export class MenuColorModal extends React.Component {
    onSelectColor = (color, ev) => {
        ev.stopPropagation()
        this.props.onAddColor(color)

    }


    render() {
        const colors = [
            '#98D4BB',
            '#9AC8EB',
            '#5784BA',
            '#37667E',
            '#BEB4C5',
            '#F27348',
            '#DC828F',
            '#A15D98',
            '#F7CE76',
            '#F4C815',
        ]
        return (
            <div className="board-menu-color-container">

                {colors.map(color => <span onClick={(ev) => this.onSelectColor(color, ev)} className="color-preview" style={{ backgroundColor: color }} />)}
            </div>

        )
    }
}