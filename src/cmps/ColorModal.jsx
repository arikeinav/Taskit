import React from "react";

export class ColorModal extends React.Component {

    onClickColor = (color, ev) => {
        const labels = this.props.labels
        ev.stopPropagation();
        if (labels && labels.length > 0) {
            const isColorInLabels = labels.filter(label => label === color)

            if (isColorInLabels.length > 0) {
                return
            } else {
                this.props.onSaveLabels(color);
            }
        } else {
            this.props.onSaveLabels(color);
        }
    }

    render() {
        return (
            <div className="color-container flex column">
                <span onClick={(ev) => this.onClickColor('#61BD4F', ev)} style={{ backgroundColor: "#61BD4F" }} ></span>
                <span onClick={(ev) => this.onClickColor('#F2D600', ev)} style={{ backgroundColor: "#F2D600" }}></span>
                <span onClick={(ev) => this.onClickColor('#FF9F1A', ev)} style={{ backgroundColor: "#FF9F1A" }}></span>
                <span onClick={(ev) => this.onClickColor('#EB5A46', ev)} style={{ backgroundColor: "#EB5A46" }}></span>
                <span onClick={(ev) => this.onClickColor('#C377E0', ev)} style={{ backgroundColor: "#C377E0" }}></span>
                <span onClick={(ev) => this.onClickColor('#0079BF', ev)} style={{ backgroundColor: "#0079BF" }}></span>
            </div>

        )
    }
}