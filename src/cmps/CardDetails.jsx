import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { FaCheckCircle, FaFileImage, FaTrashAlt,FaUserCircle, FaCalendarAlt, FaYoutube ,FaPaintBrush} from "react-icons/fa";
import { BiMenu, } from "react-icons/bi";
import { MdColorLens, MdInvertColors } from "react-icons/md";
import { TwitterPicker } from "react-color";
import EditableLabel from 'react-editable-label'
import ReactPlayer from 'react-player/youtube'
import Canvas from "./Canvas";
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Scroll from 'react-scroll';
import { ColorModal } from './ColorModal'
import { boardService } from '../services/boardService'
import { AddImg } from './AddImg'
import { Checklist } from './Checklist'
import ChecklistAdd from './ChecklistAdd';
import { updateBoard } from '../store/actions/boardActions'
import { CardInvite } from './CardInvite'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

var Element = Scroll.Element;

export class _CardDetails extends Component {

    state = {
        card: null,
        isAddImgModalShown: false,
        isDescriptionEdit: false,
        isTimeEdit: false,
        isLabelesEdit: false,
        isChecklistEdit: false,
        isAddColorModalShown: false,
        isYoutubeShown: false,
        isCanvas: false,
    }
    
    componentDidMount() {
        const card = boardService.getCardById(this.props.board, this.props.groupId, this.props.cardId)
        this.setState({ card })
    }

    updateState = (key, val) => {
        this.setState({ [key]: val })
        if(key==='isAddImgModalShown'){
            this.onRemoveYoutube()
        }
    }
    onRmoveModal = () => {
        this.saveCard()
        this.props.updateState('isDetailsShown', false)
    }
    onHandleRemove = () => {
        this.props.updateState('isDetailsShown', false)
        boardService.addActivity(this.props.board, 'Remove card', this.state.card, this.props.currUser)
        this.props.onRemoveCard(this.state.card.id)
    }

  
    onRemoveImg = () => {
        const card = this.state.card
        delete card.imgUrl
        this.setState({ card })
    }
    onRemoveYoutube = () => {
        const card = this.state.card
        delete card.youtube
        this.setState({ card })
    }
    saveCard = () => {
        this.updateState('isDescriptionEdit', false)
        var cardId = this.state.card.id;
        const newBoard = { ...this.props.board }
        const group = newBoard.groups.find(group => group.id === this.props.groupId);
        const cardIdx = group.cards.findIndex(card => card.id === cardId);
        group.cards.splice(cardIdx, 1, this.state.card)
        this.props.updateBoard(newBoard)
    }
   
    doneEdit = () => {
        this.updateState('isDescriptionEdit', false)
        this.saveCard()
    }
    updateLocalCard = (key, val) => {

        this.setState(prevState => ({
            card: {
                ...prevState.card,
                [key]: val
            }
        }))
    }
    handleFocusOut = (title) => {
        this.updateLocalCard('title', title)

    }
    onRemoveDuedate = () => {
        this.updateState('isTimeEdit', false)
        const card = this.state.card
        delete card.dueDate
        this.setState({ card })
        this.saveCard()
  
    }
  handleChangeDuedate = (data) => {
    this.updateState("isTimeEdit", false);
    this.updateLocalCard("dueDate", data);
    this.saveCard();
  };
  onSaveLabels = (val, ev) => {
    ev.stopPropagation();
    if (this.state.card.labels && this.state.card.labels.length > 4) return;
    var labels = [val];
    if (this.state.card.labels) {
      labels = this.state.card.labels;
      labels.push(val);
    }
    this.updateLocalCard("labels", labels);
    boardService.addActivity(
      this.props.board,
      "Add label",
      this.state.card,
      this.props.currUser
    );
  };
  onRemoveLabel = (label) => {
    const labels = this.state.card.labels;
    const labelIdx = labels.indexOf(label);
    labelIdx > -1 && labels.splice(labelIdx, 1);
    this.updateLocalCard("labels", labels);
  };
  onOpenDuedate = () => {
    this.updateLocalCard("dueDate", new Date());
    this.setState({ isTimeEdit: true });
    boardService.addActivity(
      this.props.board,
      "Add dueDate",
      this.state.card,
      this.props.currUser
    );
  };
  saveChecklist = (checklist) => {
    this.updateLocalCard("checklist", checklist);
    this.saveCard();
  };
  addNewChecklist = (checklist) => {
    this.saveChecklist(checklist);
  };
  removeChecklist = () => {
    this.saveChecklist({});
  };
  onOpenLabelModal = (ev) => {
    ev.stopPropagation();
    if (this.state.isLabelesEdit) {
      this.setState({ isLabelesEdit: false });
      return;
    }
    if (this.state.card.labels) {
      if (this.state.card.labels.length < 6) {
        this.setState({ isLabelesEdit: true });
      }
    } else {
      this.setState({ isLabelesEdit: true });
    }}
    onRemoveLabel = (label) => {
        const labels = this.state.card.labels
        const labelIdx = labels.indexOf(label);
        labelIdx > -1 && labels.splice(labelIdx, 1);
        this.updateLocalCard('labels', labels)
    }
    onOpenDuedate = () => {
        this.updateLocalCard('dueDate', new Date())
        this.setState({ isTimeEdit: true })
        boardService.addActivity(this.props.board, 'Add dueDate', this.state.card, this.props.currUser)

    }
    saveChecklist = (checklist) => {
        this.updateLocalCard('checklist', checklist)
        this.saveCard()
    }
    addNewChecklist = (checklist) => {
        this.saveChecklist(checklist)
    }
    removeChecklist = () => {
        this.saveChecklist({})
    }
    onOpenLabelModal = (ev) => {
        ev.stopPropagation()
        if (this.state.isLabelesEdit) {
            this.setState({ isLabelesEdit: false })
            return
        }
        if (this.state.card.labels) {
            if (this.state.card.labels.length < 6) {
                this.setState({ isLabelesEdit: true })
            }
        } else {
            this.setState({ isLabelesEdit: true })
        }
    }
    openChecklistEditor = () => {
        this.setState({ isChecklistEdit: (this.state.isChecklistEdit ? false : true) })
        boardService.addActivity(this.props.board, 'Add Checklist', this.state.card, this.props.currUser)

    }
    handleChangeBGColor = (color, ev) => {
        ev.stopPropagation();
        this.updateLocalCard('bgColor', color.hex)
    }
    onOpenColorModal = (ev) => {
        ev.stopPropagation();
        boardService.addActivity(this.props.board, 'Add BG Color', this.state.card, this.props.currUser)
        this.setState({ isAddColorModalShown: true })
        this.saveCard()
    }
   
    onModalClick = () => {
        this.setState({ isAddColorModalShown: false })
        this.setState({ isLabelesEdit: false })
    }
    getAvatar(member) {
        if (member && member.imgUrl) {
            return <Avatar key={member._id} src={member.imgUrl} className="avatar" />
        }
        if (member) {
            return <Avatar key={member._id} className="avatar">{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
        }
        return <Avatar className="avatar" />
    }
  
    youtubeFunc = (url)=>{
        this.setState({isYoutubeShown:false})
        this.onRemoveImg()
        this.updateLocalCard('youtube',url)
        // this.saveCard()
    }

    render() {
        if (!this.state.card) return <div>Loading...</div>
        const { card } = this.state
        const { board } = this.props

        return (
            <div className="card-modal flex align-center">

                <div className="empty-modal" onClick={this.onRmoveModal}></div>

                <div className="details-modal flex column" onClick={this.onModalClick}>

                    <header className="card-header flex column align-center" style={{ backgroundColor: card.bgColor }}>

                        {card.youtube && <ReactPlayer width='50%' height='100%' url={card.youtube} />}
                      
                        {card.imgUrl &&
                            <img className="card-img" src={card.imgUrl} alt="Loading" />
                        }
                        {card.imgUrl && <button onClick={this.onRemoveImg} className="btn delete-img-btn" style={{ paddingLeft: "10px", paddingRight: "6px" }}><FaTrashAlt style={{ marginRight: "5px" }} /></button>}


                        {this.state.isAddColorModalShown &&
                            <div>
                                <TwitterPicker onChange={this.handleChangeBGColor} colors={['#FFFFFF', '#99f3bd', '#99f3bd', '#7ea04d', '#f0a500', '#de4463', '#fccbcb', '#70adb5', '#625261', '#89beb3', '#efbbcf', '#8ED1FC', '#ABB8C3', '#F78DA7']} triangle="hide" />
                            </div>
                        }
                    </header>
                    <div className="body-div flex">
                        <Element style={{
                            height: '380px',
                            width: '100%',
                            overflow: 'scroll',
                            overflowX: 'hidden',
                        }}>
                            <div className="modal-details-left">
                                
                                    
                                   
                                    
                                          <EditableLabel 
                         initialValue={(card.title)}
                         save={value => {this.handleFocusOut(value)}}
                         inputClass='title-input'
                         labelClass='my-label-class'
                         
                            />
                                <div>
                                    {(card.labels && card.labels.length > 0) &&
                                        <div style={{ margin: '15px 0', height: '40px' }} className="flex">
                                            <div className="flex align-center">
                                                <p style={{ marginRight: '10px' }} className="cd-subt">Labels: </p>
                                                {card.labels.map(label => <div key={label} onClick={() => this.onRemoveLabel(label)} className="small-label" style={{ backgroundColor: label }} />)}
                                            </div>
                                        </div>
                                    }
                                    <div className="flex align-center"><BiMenu style={{
                                        marginRight: '5px', width: '18px',
                                        height: '18px'
                                    }} /><p onClick={() => this.updateState('isDescriptionEdit', true)} className="cd-subt"> Description:</p></div>

                                    {this.state.isDescriptionEdit ?
                                        <div className="edit-desc flex column align-center" >
                                            {/* <TextField
                                                border="none"
                                                multiline
                                                rows={6}
                                                defaultValue={this.state.card.description}
                                                // variant="outlined"
                                                className="edit-card-description"
                                                onChange={ev => this.updateLocalCard('description', ev.target.value)}
                                            /> */}
                                            <TextareaAutosize
                                            rowsMax={4}
                                            aria-label="maximum height"
                                            placeholder="Enter description"
                                            defaultValue={this.state.card.description}
                                            border="none"
                                                className="edit-card-description"
                                                onChange={ev => this.updateLocalCard('description', ev.target.value)}
                                          />
                                            <button onClick={this.saveCard} className="btn">Save</button>
                                        </div>
                                        :
                                        <div
                                            className="not-edit-card-description"
                                            onClick={() => this.updateState('isDescriptionEdit', true)}> 
                                            <pre>{this.state.card.description ? this.state.card.description : "Add a more details description..."}
                                       </pre>  </div>
                                    }
                                </div>

                                <div className="members-container flex">

                                    {/* <button className="btn btn-invite self-start" > <FaUserCircle style={{ marginRight: "5px" }} /> Invite</button> */}

                                    <CardInvite board={board} card={card} updateBoard={this.props.updateBoard} />

                                    {(card.members && card.members.length > 0) &&
                                        <div>
                                            <section className="avatar-members flex">
                                                {card.members &&
                                                    <AvatarGroup max={4}>
                                                        {card.members.map(member => this.getAvatar(member))}
                                                    </AvatarGroup>
                                                }
                                            </section>
                                        </div>
                                    }
                                </div>

                                {(this.state.isTimeEdit || card.dueDate) &&
                                    <div>
                                        <DatePicker
                                            selected={(card.dueDate) ? new Date(card.dueDate) : new Date()}
                                            onChange={this.handleChangeDuedate}
                                            showTimeSelect
                                            dateFormat="Pp"
                                        />

                                        <button onClick={this.onRemoveDuedate} className="btn">X</button>
                                    </div>
                                }


                                {this.state.card.checklist && <Checklist removeChecklist={this.removeChecklist} saveChecklist={this.saveChecklist} checklist={this.state.card.checklist} />}
                                {this.state.isChecklistEdit && <ChecklistAdd addNewChecklist={this.addNewChecklist} />}


                            </div>
                        </Element >
                        <div className="side-bar-details-right flex column justify-start">
                            <button className="btn align-center" style={{display: 'flex'}} onClick={() => this.updateState('isAddImgModalShown', true)}><FaFileImage style={{ marginRight: "7px" }} />Cover</button>

                            <button className="btn align-center" style={{display: 'flex'}} onClick={this.onOpenColorModal}><MdColorLens style={{ marginRight: "3px", height: '12px', width: '12px' }} />Color</button>

                            <button className="btn align-center" style={{display: 'flex'}} onClick={() => this.openChecklistEditor()}><FaCheckCircle style={{ marginRight: "6px" }} />Checklist</button>
                            <button onClick={this.onOpenDuedate} className="btn align-center"><FaCalendarAlt style={{ marginRight: "5px" }} /> Due Date</button>
                            <button onClick={this.onOpenLabelModal} style={{display: 'flex'}} className="btn align-center"><MdInvertColors style={{ marginRight: "5px", height: '12px', width: '12px' }} />Labels</button>
                            {this.state.isLabelesEdit &&
                                <ColorModal className="color-modal" onSaveLabels={this.onSaveLabels} labels={card.labels} />}

                            <button className="btn align-center" style={{display: 'flex'}} onClick={() => (this.setState({ isYoutubeShown: true }))}><FaYoutube style={{ marginRight: "6px", height: '12px', width: '12px' }}/> YouTube</button>
                            {this.state.isYoutubeShown && <div style={{border: "1px solid black"}}><EditableLabel 
                                initialValue={'Paste Url Here'}
                                save={(url)=>this.youtubeFunc(url)}
                         
                                labelClassName='youtube-label'
                                inputClassName='youtube-input'
                                /></div>
                            }
                            <button onClick={()=>this.setState({isCanvas:true})} className="btn"><FaPaintBrush style={{ marginRight: "6px" }}/>

                
Canvas
</button>
                            <button onClick={this.onHandleRemove} className="btn"> <FaTrashAlt style={{ marginRight: "6px" }} />Card</button>
                        </div>

                    </div >
                    {this.state.isAddImgModalShown && <AddImg card={card} updateState={this.updateState} />}
                    {this.state.isCanvas && <Canvas updateLocalCard={this.updateLocalCard} updateState={this.updateState} card={this.state.card}/>}
                </div >
            </div >
        )
    }
}

const mapStateToProps = (state) => {
  return {
    board: state.boardReducer.currBoard,
    currUser: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  updateBoard,
};

export const CardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardDetails);
