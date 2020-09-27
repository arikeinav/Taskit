import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from '@material-ui/core';

import { userService } from '../services/userService'

export function CardInvite({ board, card, updateBoard }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const allMembers = board.members ? [...board.members] : [];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const onSelectMember = async (userId) => {
        setAnchorEl(null);
        if (card.members) {
            const memberInBoard = card.members.filter(member => member._id === userId)
            if (memberInBoard.length > 0) return
            const user = await userService.getById(userId)
            card.members.push(user)
        } else {
            const user = await userService.getById(userId)
            card.members = [user]
        }
        updateBoard(board)
    }


    return (
        <div className="invite-modal">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >

                <p className="btn btn-invite"><FaUserCircle style={{ margin: "0px 5px -2px" }} />Invite</p>
                <p className="btn invite-btn-small-screen"><FaUserCircle style={{ marginRight: "5px" }} /></p>

            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {allMembers.length > 0 ?
                    allMembers.map(member =>
                        <MenuItem key={member._id} className="user-in-list">
                            <div className="members flex" onClick={() => onSelectMember(member._id)}>
                                <Avatar src={member.imgUrl} alt="img" className="user-img" />
                                <p className="user-name">{member.userName}</p>
                            </div>
                        </MenuItem>)
                    :
                    <MenuItem>The are no members in this board</MenuItem>
                }
            </Menu>
        </div>
    )
}