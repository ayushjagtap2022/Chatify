import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';

const Footer = ({ handleSendMsg, handleSendGroupMsg, roomData, replyMessage, setReplyMessage }) => {
    const [message, setMessage] = useState("");
    const textFieldRef = useRef(null);

    useEffect(() => {
        if (replyMessage) {
            textFieldRef.current.focus();
        }
    }, [replyMessage]);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (roomData.room.groupName) {
            // Send message to group
            handleSendGroupMsg({ groupId: roomData.room._id, message, replyMessage });
        } else {
            // Send message to individual user
            handleSendMsg(message);
        }

        setMessage("");
        setReplyMessage(null);
    };

    return (
        <Box sx={{ p: 1, display: "flex", position: 'relative' }}>
            {replyMessage && (
                <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: "57px", p: 1, background: "#dddd", borderLeft: "4px solid", borderColor: "primary.light" }}>
                    <Typography>{replyMessage.sender.name}</Typography>
                    <Typography variant='caption'>{replyMessage.message}</Typography>
                    <IconButton aria-label='close' onClick={() => setReplyMessage(null)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: "center" }}>
                <Button sx={{ minWidth: "auto", mr: 1 }}>
                    <MoreVertIcon />
                </Button>
                <Button sx={{ minWidth: "auto", mr: 1 }}>
                    <InsertEmoticonIcon />
                </Button>
            </Box>
            <Box sx={{ display: "flex", flex: 1 }} component="form" onSubmit={handleSubmit}>
                <TextField
                    placeholder='Type your message here'
                    size='small'
                    sx={{
                        "&.MuiInputBase-root": {
                            borderRadius: 0,
                            borderRight: 0
                        }
                    }}
                    fullWidth
                    onChange={handleChange}
                    value={message}
                    inputRef={textFieldRef}
                />
                <Button variant='outlined' type="submit" sx={{ borderRadius: 0, minWidth: "auto", height: "100%" }}>Send</Button>
            </Box>
        </Box>
    );
};

export default Footer;
