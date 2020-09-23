import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

const Container = styled.div`
background-color: ${props => (props.isDragging ? '#B5B5B5' : 'rgba(255, 255, 255, 0.822)')};
`;

export function CardPreview({ card, updateState, groupId, index }) {




    // function getValidDate() {
    //     var a = card.dueDate
    //     var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //     var year = a.getFullYear();
    //     var month = months[a.getMonth()];
    //     var date = a.getDate();
    //     var hour = a.getHours();
    //     var min = a.getMinutes();
    //     var sec = a.getSeconds();
    //     var dueDate = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    //     console.log("getValidDate -> dueDate", dueDate)


    //     return dueDate
    // }



    const openCardDetails = (cardId) => {
        updateState('isDetailsShown', { cardId, groupId })
    }

    return (
        < Draggable draggableId={card.id} index={index} >
            {(provided, snapshot) => (
                <NaturalDragAnimation
                    style={provided.draggableProps.style}
                    snapshot={snapshot}
                >
                    {style => (
                        <Container isDragging={snapshot.isDragging} className="card-preview flex column justify-center" onClick={() => openCardDetails(card.id)} {...provided.draggableProps} {...provided.dragHandleProps} style={style} ref={provided.innerRef}>
                            <div style={{ backgroundColor: card.bgColor }}>
                                <div className="flex">
                                    {(card.labels && card.labels.length > 0) &&
                                        card.labels.map(label => <div key={label} className="small-small-label" style={{ backgroundColor: label }} />)
                                    }
                                </div>
                                <p className="p-card-preview">{card.title}</p>
                                {/* <div className="due-date-card-preview">{getValidDate()}</div> */}
                                {card.imgUrl && <img className="img-card-preview" src={card.imgUrl} alt="Loading" />}
                            </div>

                        </Container >
                    )}
                </NaturalDragAnimation>
            )
            }
        </Draggable >
    )
}
