import React from "react";

export class MenuColorModal extends React.Component {
    onSelectColor = (color, ev) => {
        ev.stopPropagation()
        this.props.onAddColor(color)

    }


    render() {
        const colors = [
            '#FEEDCC',
            '#DDDEAD',
            '#A9D7A9',
            '#51C2B1',
            '#24A39A',
            '#679CB4',
            '#A67376',
            '#FE797B',
            '#FFB750',
            '#FFEA56',
            '#8FE968',
            '#36CEDC',
            '#F3F3F6',
        ]
        return (
            <div className="board-menu-color-container">

                {colors.map(color => <span onClick={(ev) => this.onSelectColor(color, ev)} className="color-preview" style={{ backgroundColor: color }} />)}
            </div>

        )
    }
}