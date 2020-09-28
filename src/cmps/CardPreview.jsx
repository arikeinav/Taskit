import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import ReactPlayer from 'react-player/youtube'


const Container = styled.div`
background-color: ${props => (props.isDragging ? '#B5B5B5' : '#fff')};
`;


export function CardPreview({ card, updateState, groupId, index, calcProgress }) {



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
                        <Container   isDragging={snapshot.isDragging}  className="card-preview flex column justify-center" onClick={() => openCardDetails(card.id)} {...provided.draggableProps} {...provided.dragHandleProps} style={style} ref={provided.innerRef}>
                            <div className='card flex column space-between' style={{ backgroundColor: card.bgColor }} >
                                <div className="flex  space-between">
                                <div className="flex">{(card.labels && card.labels.length > 0) && 
                                        card.labels.map(label => <div key={label} className="small-small-label" style={{ backgroundColor: label }} />)
                                          }</div>
                                    {card.checklist && <div className="footer-div-card-prev">{calcProgress(card.id)}</div>}
                                </div>
                                <p className="p-card-preview">{card.title}</p>
                                        {card.youtube && <div className="img-card-preview"><ReactPlayer  width='100%' height='100%' url={card.youtube} /></div>  ||
                                        card.imgUrl && <img className="img-card-preview" src={card.imgUrl} alt="Loading" />}
                            </div>
                            
                        </Container >
                    )}
                </NaturalDragAnimation>
            )
            }
        </Draggable >
    )
}
