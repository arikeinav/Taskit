import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaUserCircle } from "react-icons/fa";




export function InviteModal({ members }) {
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //   const handleAdd = () => {
    //     // onAddCard('isAddCard', true)
    //     handleClose()
    //   };
    //   const handledelete = () => {
    //     // onShowDeleteTogglle()

    //   };
    const handleClose = () => {
        setAnchorEl(null);
    }
    //   const onDelete = () => {
    //     // onRemove(group.id)
    //     handleClose()
    //   }


    return (
        <div>
            <Button style={{ fontWeight: '900' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="BH3 btn board-header-btn flex">
                <FaUserCircle style={{ margin: "0px 5px -2px" }} />Invite
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* {members &&
                members.map(member => <MenuItem >{member}</MenuItem>)
                } */}

                <MenuItem >Change list name</MenuItem>
                <MenuItem >Backgroun color</MenuItem>
                <MenuItem >Backgroun color</MenuItem>
                <MenuItem >Backgroun color</MenuItem>
                <MenuItem >Backgroun color</MenuItem>
            </Menu>
        </div>
    )
}