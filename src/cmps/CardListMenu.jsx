import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export function SimpleMenu({ onRemove, group, isDeleteGroup, onShowDeleteTogglle, onAddCard }) {
  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdd = () => {
    onAddCard('isAddCard', true)
    handleClose()
  };
  const handledelete = () => {
    onShowDeleteTogglle()

  };
  const handleClose = () => {
    if (isDeleteGroup) {
      onShowDeleteTogglle()
      setAnchorEl(null);
    }

    setAnchorEl(null);
  };
  const onDelete = () => {
    onRemove(group.id)
    handleClose()
  }


  return (
    <div>
      <Button style={{fontWeight:'900'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          . . .
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem >Change list name</MenuItem>
        <MenuItem >Backgroun color</MenuItem>
        <MenuItem onClick={handleAdd}>Add card</MenuItem>
        <MenuItem onClick={handledelete}>Delete list</MenuItem>
        {isDeleteGroup && <MenuItem ><button className="btn" style={{ color: 'red', marginRight: '2px' }} onClick={onDelete}>Delete</button> <button style={{ marginLeft: '2px' }} className="btn" onClick={handleClose}>Cancel</button></MenuItem>}

      </Menu>
    </div>
  );
}