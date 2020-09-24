import React from "react";

export class ColorModal extends React.Component {

    onClickColor = (color, ev) => {
        console.log('onClickColor');

        const labels = this.props.labels
        ev.stopPropagation();
        if (labels && labels.length > 0) {
            const isColorInLabels = labels.filter(label => label === color)

            if (isColorInLabels.length > 0) {
                return
            } else {
                this.props.onSaveLabels(color, ev);
            }
        } else {
            this.props.onSaveLabels(color, ev);
        }
    }

    render() {
        const colors = [
            '#61BD4F',
            '#F2D600',
            '#FF9F1A',
            '#EB5A46',
            '#C377E0',
            '#0079BF',
        ]
        return (
            <div className="color-container flex column">
                {colors.map(color => <span key={color} onClick={(ev) => this.onClickColor(color, ev)} style={{ backgroundColor: color }} />)}
            </div>
        )
    }
}