import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Box, Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText, Divider, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';

const SideBar = ({ user, onlineUsers, roomData, setRoomData, setAllMessages, handleGroupChat, setAllGroupMessages }) => {
    const [value, setValue] = useState(0);
    const [groups, setGroups] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Fetch groups by user ID on component load
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/groups/${user.user._id}`);
                setGroups(response.data.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };
        fetchGroups();
    }, [user.user._id]);

    // Function to handle new group addition
    const addNewGroup = (newGroup) => {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
    };

    const handleChatRoom = async (users) => {
        try {
            setAllGroupMessages([]);
            let receiverUser = users;
            setRoomData((prevRoomData) => ({
                ...prevRoomData,
                room: "test",
                receiver: users
            }));
            const response = await axios.get(`http://localhost:5000/api/v1/messages/${user.user._id}`, {
                params: { otherId: receiverUser.user._id }
            });
            setAllMessages(response.data.data);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };


    return (
        <Box sx={{ width: "20vw", display: "flex", flexDirection: "column", height: "auto" }}>
            <Header user={user} />
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='fullWidth'>
                <Tab label="Chat List" iconPosition='start' sx={{ fontSize: "15px" }} icon={<ChatIcon />} />
                <Tab label="Groups" iconPosition='start' sx={{ fontSize: "15px" }} icon={<PersonIcon />} />
            </Tabs>
            {value === 0 && (
                <List sx={{ p: 0, overflowY: "auto" }}>
                    {onlineUsers.filter((users) => users.user._id !== user.user._id).map((users) => (
                        <ListItem sx={{ cursor: "pointer" }} onClick={() => handleChatRoom(users)} alignItems="flex-start" key={users.user._id}>
                            <ListItemAvatar>
                                <Avatar alt={"" || users.user.name} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={users.user.name}
                                secondary={
                                    <Typography variant="caption">
                                        {users.user.email}
                                    </Typography>
                                }
                            />
                            <Divider component="li" />
                        </ListItem>
                    ))}
                </List>
            )}
            {value === 1 && (
                <List sx={{ p: 0, overflowY: "auto" }}>
                    {groups.map((group, index) => (
                        <React.Fragment key={group._id}>
                            <ListItem onClick={() => handleGroupChat(group)} sx={{ cursor: "pointer" }} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>
                                        {group.groupName.charAt(0).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={group.groupName}
                                    secondary={
                                        <Typography variant="caption">
                                            {group.groupDescription}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {/* Add divider only if it's not the last group */}
                            {index < groups.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SideBar;
