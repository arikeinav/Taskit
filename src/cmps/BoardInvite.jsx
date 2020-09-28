import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from '@material-ui/core';

import { userService } from '../services/userService'

export function BoardInvite({ board, updateBoard }) {

    const allMembers = [
        {
            _id: "5f6f020e486616919e1f0de3",
            userName: "Arik Einav",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1600864700/Taskit/erik_lnajh5.png"
        }, {
            _id: "5f6f0220486616919e1f13c2",
            userName: "Shlomi Koplianski",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1600864700/Taskit/shlomi_rujmqc.png"
        }, {
            _id: "5f6f01f9486616919e1f0682",
            userName: "Shahar Sadof",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1600864700/Taskit/shahar_wyjntk.png"
        }, {
            _id: "5f6f374f81cc744a0002589c",
            userName: "Meital Lazarovich",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1601122561/Taskit/meital_xr42uc.png"
        }, {
            _id: "5f6f37c181cc744a0002589d",
            userName: "Yaron Biton",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1601123470/Taskit/Yaron_z1uuw2.png"
        },
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const onSelectMember = async (userId) => {
        setAnchorEl(null);
        if (board.members) {
            const memberInBoard = board.members.filter(member => member._id === userId)
            if (memberInBoard.length > 0) return
            const user = await userService.getById(userId)
            board.members.push(user)
        } else {
            const user = await userService.getById(userId)
            board.members = [user]
        }
        updateBoard(board)
    }


    return (
        <div className="invite-modal">
            {/* <div onClick={handleClick} className="board-header-invite"> */}
                <button onClick={handleClick}  className="btn invite-btn"><FaUserCircle style={{ margin: "0px 5px -2px" }} />Invite</button>
                <button onClick={handleClick} className="btn invite-btn-small-screen"><FaUserCircle /></button>
            {/* </div> */}
            
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {allMembers &&
                    allMembers.map(member =>
                        <MenuItem key={member._id} className="user-in-list">
                            <div className="members flex" onClick={() => onSelectMember(member._id)}>
                                <Avatar src={member.imgUrl} alt="img" className="user-img" />
                                <p className="user-name">{member.userName}</p>
                            </div>
                        </MenuItem>)
                }
            </Menu>
        </div>
    )
}