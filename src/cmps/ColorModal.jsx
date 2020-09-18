import React from "react";

export class ColorModal extends React.Component {

    onChangeColor = (color,cardId,ev) => {
        ev.stopPropagation();
        this.props.closeColors();
        this.props.onColorChange(cardId, color)
    }


    render() {
        const {card} =this.props
        return (
            <div className="color-container">
                <span onClick={(ev) => this.onChangeColor('blue',card.id, ev)} style={{ backgroundColor: "blue" }}></span>
                <span onClick={(ev) => this.onChangeColor('green',card.id, ev)} style={{ backgroundColor: "green" }}></span>
                <span onClick={(ev) => this.onChangeColor('yellow',card.id, ev)} style={{ backgroundColor: "yellow" }}></span>
                <span onClick={(ev) => this.onChangeColor('black',card.id, ev)} style={{ backgroundColor: "black" }}></span>
                <span onClick={(ev) => this.onChangeColor('red',card.id, ev)} style={{ backgroundColor: "red" }}></span>
                <span onClick={(ev) => this.onChangeColor('pink',card.id, ev)} style={{ backgroundColor: "pink" }}></span>
                <span onClick={(ev) => this.onChangeColor('orange',card.id, ev)} style={{ backgroundColor: "orange" }}></span>
                <span onClick={(ev) => this.onChangeColor('gray',card.id, ev)} style={{ backgroundColor: "gray" }}></span>
                <span onClick={(ev) => this.onChangeColor('white',card.id, ev)} style={{ backgroundColor: "white" }}></span>
            </div>

        )
    }
}