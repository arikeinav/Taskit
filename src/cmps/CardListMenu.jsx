import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TwitterPicker } from 'react-color'


export function SimpleMenu({ onRemove, group,isGroupColor,onShowColorTogglle, isDeleteGroup, onShowDeleteTogglle, onAddCard,onGroupColorChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdd = () => {
    onAddCard('isAddCard', true)
    handleClose()
  };
  const handledelete = () => {
    if (isGroupColor){ 
      onShowColorTogglle()
    }
    onShowDeleteTogglle()

  };
  const handleClose = () => {
    if (isDeleteGroup) {
       onShowDeleteTogglle()
       setAnchorEl(null);
      } else if (isGroupColor){ 
        onShowColorTogglle()
        setAnchorEl(null);
      }else
    setAnchorEl(null);
  };
  const onDelete = () => {
    onRemove(group.id)
    handleClose()
  }
  const handlecolor=(color, ev)=>{
    ev.stopPropagation();
    onGroupColorChange(color.hex)

  }
  const onColorTogglle=()=>{
    if (isDeleteGroup) {
      onShowDeleteTogglle()
    }
    onShowColorTogglle()
  }


  return (
    <div >
    <Button style={{fontWeight:'900',minWidth:'45px'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       <span style={{marginBottom:"2px"}}>. . .</span> 
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <div style={{color:"#666666",textAlign:"center"}} >List menu </div>
        <hr style={{margin:"3px 7px"}}/> */}
        <MenuItem onClick={onColorTogglle} >Background color</MenuItem>
        {isGroupColor &&<TwitterPicker onChange={handlecolor}  colors={['#218B82', '#9AD9DB', '#E5DBD9', '#98D4BB', '#EB96AA', '#ebecf0']} triangle="hide" />}
        <MenuItem onClick={handleAdd}>Add card</MenuItem>
        <MenuItem onClick={handledelete}>Delete list</MenuItem>
        {isDeleteGroup && <MenuItem ><button className="btn" style={{ color: 'red', marginRight: '2px' }} onClick={onDelete}>Delete</button> <button style={{ marginLeft: '2px' }} className="btn" onClick={handleClose}>Cancel</button></MenuItem>}

      </Menu>
    </div>
  );
}