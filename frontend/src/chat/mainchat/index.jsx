import { Box } from '@mui/material'
import React from 'react'
import Header from './Header'
import ChatArea from './ChatArea'
import Footer from './Footer'
const ChatBox = ({ roomData, handleSendMsg, allMessages, user, handleDelete, replyMessage, setReplyMessage, handleSendGroupMsg, allGroupMessages }) => {


    return (
        <Box sx={{ width: '50vw', display: 'flex', height: '100%', flexDirection: "column" }}>
            {roomData.room ?
                <>
                    <Header roomData={roomData} />
                    <ChatArea allGroupMessages={allGroupMessages} roomData={roomData} user={user} allMessages={allMessages} handleDelete={handleDelete} setReplyMessage={setReplyMessage} />
                    <Footer handleSendGroupMsg={handleSendGroupMsg} roomData={roomData} handleSendMsg={handleSendMsg} replyMessage={replyMessage} setReplyMessage={setReplyMessage} />
                </> :
                <h1>
                    Please select a user to chat
                </h1>}
        </Box>
    )
}

export default ChatBox