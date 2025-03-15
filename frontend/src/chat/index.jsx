import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import axios from 'axios';
import { Paper } from '@mui/material';
import SideBar from './sidebar';
import ChatBox from './mainchat';
import Profile from './profile';
import { useLocation, useNavigate } from 'react-router-dom';

const Chat = () => {
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    const groupIdRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [roomData, setRoomData] = useState({
        room: null,
        sender: null,
        receiver: null
    });
    const [allMessages, setAllMessages] = useState([]);
    const [allGroupMessages, setAllGroupMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState(null);
    const { state } = useLocation();
    const navigate = useNavigate();
    const socketUrl = "http://localhost:5000";

    useEffect(() => {
        if (!state) {
            navigate('/');
            return;
        }

        const socket = io(socketUrl);
        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
            socket.emit("ADD_USER", state); // Emit user on connect
        });

        socket.on("USER_ADDED", (data) => {
            setOnlineUsers(data); // Update online users state
        });

        socket.on('RECEIVED_MESSAGE', (data) => {
            setAllMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('DELETED_MESSAGE', (data) => {
            setAllMessages((prevMessages) => prevMessages.filter((item) => item._id !== data.message._id));
        });

        // Listening for group messages via "GROUP_MESSAGE_RECEIVED" event
        socket.on("GROUP_MESSAGE_RECEIVED", (data) => {
            console.log("Received group message:", data);

            if (data.groupId === groupIdRef.current) {
                setAllGroupMessages((prevMessages) => [...prevMessages, data]);
                console.log(allGroupMessages, "Updated allGroupMessages state");
            }
        });

        return () => {
            socket.off("connect");
            socket.off("USER_ADDED");
            socket.off('RECEIVED_MESSAGE');
            socket.off('DELETED_MESSAGE');
            socket.off('GROUP_MESSAGE_RECEIVED');
            socket.disconnect(); // Clean up on unmount
        };
    }, [state, navigate]);

    useEffect(() => {
        console.log("allGroupMessages updated:", allGroupMessages);
    }, [allGroupMessages]); // Log each time allGroupMessages updates

    const handleSendMsg = (message) => {
        let sender = { ...state.user, socketId: socketRef.current.id };
        let receiver = { ...roomData.receiver.user, socketId: roomData.receiver.socketId };

        if (socketRef.current.connected) {
            const data = {
                message,
                sender,
                receiver,
                replyMessage: replyMessage || null
            };
            socketRef.current.emit("SEND_MESSAGE", data);
            setReplyMessage(null);
        }
    };

    const handleSendGroupMsg = ({ groupId, message, replyMessage }) => {

        const data = { groupId, message, senderId: state.user._id, replyMessage, senderName: state.user.name, senderEmail: state.user.email };
        socketRef.current.emit("SEND_GROUP_MESSAGE", data);
    };

    const handleDelete = async (msgId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/messages/${msgId}`);
            if (socketRef.current && socketRef.current.connected) {
                let sender = { ...state.user, socketId: socketRef.current.id };
                let receiver = { ...roomData.receiver.user, socketId: roomData.receiver.socketId };
                let data = {
                    message: res.data.data,
                    receiver,
                    sender
                };
                socketRef.current.emit("DELETE_MESSAGE", data);
                setAllMessages((prevMessages) => prevMessages.filter((message) => message._id !== res.data.data._id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGroupChat = (group) => {
        setAllMessages([]);
        groupIdRef.current = group._id;

        const groupUserIds = group.members.map((member) => member.userId);
        const joinGroupLogic = onlineUsers.filter((user) =>
            groupUserIds.includes(user.user._id)
        );

        console.log(joinGroupLogic, "Users who are part of the group and online");

        socketRef.current.emit("JOIN_GROUP", { groupId: group._id, userId: state.user._id });

        setRoomData({ room: group, receiver: null });
    };

    if (!state) {
        return null;
    }

    return (
        <Paper square elevation={0} sx={{ height: "100vh", margin: "-8px", display: 'flex' }}>
            <SideBar
                user={state}
                onlineUsers={onlineUsers}
                roomData={roomData}
                setRoomData={setRoomData}
                setAllMessages={setAllMessages}
                setAllGroupMessages={setAllGroupMessages}
                handleGroupChat={handleGroupChat}

            />
            <ChatBox
                handleSendGroupMsg={handleSendGroupMsg}
                roomData={roomData}
                user={state}
                handleSendMsg={handleSendMsg}
                allMessages={allMessages}
                handleDelete={handleDelete}
                replyMessage={replyMessage}
                setReplyMessage={setReplyMessage}
                allGroupMessages={allGroupMessages} // Passing all group messages to ChatBox
            />
            <Profile socketRef={socketRef} user={state} />
        </Paper>
    );
};

export default Chat;
