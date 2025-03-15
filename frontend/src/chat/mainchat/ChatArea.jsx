import React from 'react'
import { Box, List, ListItem, ListItemText, ListItemAvatar, Typography, Avatar, Stack, Chip, Paper, IconButton } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ChatArea = ({ allMessages, user, roomData, handleDelete, setReplyMessage, allGroupMessages }) => {
    return (
        <Box sx={{ overflowY: "auto", flex: "1 0 0", background: "#f9f9f9" }}>
            <Stack direction="row" justifyContent="center" sx={{ py: 2, position: "sticky", top: 0, zIndex: 2, background: "#f9f9f9" }} >
                <Chip label="Today" />
            </Stack>
            <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
                {allGroupMessages.length > 0 ? (
                    allGroupMessages.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.senderId !== user.user._id ? (
                                <ListItem sx={{ mb: 2 }} alignItems="flex-start">
                                    <Box sx={{ display: "flex", width: "80%" }}>
                                        <ListItemAvatar>
                                            <Avatar alt={item.senderName[0]} src="" />
                                        </ListItemAvatar>
                                        <Paper sx={{ width: "100%", p: 1.5 }}>
                                            <ListItemText
                                                primary={item.senderName}
                                                secondary={<Typography variant="caption">{item.message}</Typography>}
                                            />
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center" }}>
                                                <Typography variant='body2'>12:40 PM</Typography>
                                                <Box>
                                                    <IconButton size='small' onClick={() => setReplyMessage(item)}>
                                                        <ReplyIcon fontSize='small' />
                                                    </IconButton>
                                                    {item.senderId === user._id && (
                                                        <IconButton size='small' color="error" onClick={() => handleDelete(item._id)}>
                                                            <DeleteOutlineIcon fontSize='small' />
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Box>
                                </ListItem>
                            ) : (
                                <ListItem sx={{ flexDirection: "row-reverse", mb: 2 }}>
                                    <Box sx={{ display: "flex", width: "80%", flexDirection: "row-reverse" }}>
                                        <ListItemAvatar sx={{ display: "flex", flexDirection: "row-reverse" }}>
                                            <Avatar alt={item.senderName[0]} src="" />
                                        </ListItemAvatar>
                                        <Paper sx={{ width: "100%", p: 1.5, bgcolor: "#ccc" }}>
                                            <ListItemText
                                                primary={item.senderName}
                                                secondary={<Typography variant="caption">{item.message}</Typography>}
                                            />
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center" }}>
                                                <Typography variant='body2'>12:40 PM</Typography>
                                                <Box>
                                                    <IconButton size='small' onClick={() => setReplyMessage(item)}>
                                                        <ReplyIcon fontSize='small' />
                                                    </IconButton>
                                                    {item.senderId === user._id && (
                                                        <IconButton size='small' color="error" onClick={() => handleDelete(item._id)}>
                                                            <DeleteOutlineIcon fontSize='small' />
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Box>
                                </ListItem>
                            )}
                        </React.Fragment>
                    ))
                ) : (

                    allMessages.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {

                                    item.sender._id !== user.user._id ?
                                        <ListItem sx={{ mb: 2 }} alignItems="flex-start">
                                            <Box sx={{ display: "flex", width: "80%" }}>
                                                <ListItemAvatar>
                                                    <Avatar alt={"" || roomData.receiver?.user.email.split('')[0]} src="" />
                                                </ListItemAvatar>
                                                <Paper sx={{ width: "100%", p: 1.5 }}>
                                                    {item.replyMessage &&
                                                        <Paper sx={{ p: 1.5, mb: 1 }} >
                                                            <ListItemText
                                                                sx={{ m: 0 }}
                                                                primary={item.replyMessage.sender.name}
                                                                secondary={

                                                                    <Typography
                                                                        variant="caption"
                                                                    >
                                                                        {item.replyMessage.message}
                                                                    </Typography>

                                                                }
                                                            />
                                                        </Paper>
                                                    }
                                                    <ListItemText
                                                        sx={{ m: 0 }}
                                                        primary={item.sender.name}
                                                        secondary={

                                                            <Typography
                                                                variant="caption"
                                                            >
                                                                {item.message}
                                                            </Typography>

                                                        }
                                                    />
                                                    <Box mt={1} sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center" }}>
                                                        <Typography variant='body2'>
                                                            12:40 PM
                                                        </Typography>
                                                        <Box>
                                                            <IconButton size='small' onClick={() => setReplyMessage(item)}>
                                                                <ReplyIcon fontSize='small' />
                                                            </IconButton>
                                                            {item.sender._id === user.user._id &&
                                                                <IconButton size='small' color="error" onClick={() => handleDelete(item._id)}>
                                                                    <DeleteOutlineIcon fontSize='small' />
                                                                </IconButton>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            </Box>
                                        </ListItem> : (

                                            <ListItem sx={{ flexDirection: "row-reverse", mb: 2 }}>
                                                <Box sx={{ display: "flex", width: "80%", flexDirection: "row-reverse" }}>

                                                    <ListItemAvatar sx={{ display: "flex", flexDirection: "row-reverse" }}>
                                                        <Avatar alt={"" || item.sender.email.split('')[0]} src="" />
                                                    </ListItemAvatar>
                                                    <Paper sx={{ width: "100%", p: 1.5, bgcolor: "#ccc" }}>
                                                        {item.replyMessage &&
                                                            <Paper sx={{ p: 1.5, mb: 1 }} >
                                                                <ListItemText
                                                                    sx={{ m: 0 }}
                                                                    primary={item.replyMessage.sender.name}
                                                                    secondary={

                                                                        <Typography
                                                                            variant="caption"
                                                                        >
                                                                            {item.replyMessage.message}
                                                                        </Typography>

                                                                    }
                                                                />
                                                            </Paper>
                                                        }
                                                        <ListItemText
                                                            sx={{ m: 0 }}
                                                            primary={item.sender.name}
                                                            secondary={

                                                                <Typography
                                                                    variant="caption"
                                                                >
                                                                    {item.message}
                                                                </Typography>

                                                            }
                                                        />
                                                        <Box mt={1} sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center" }}>
                                                            <Typography variant='body2'>
                                                                12:40 PM
                                                            </Typography>
                                                            <Box>
                                                                <IconButton size='small' onClick={() => setReplyMessage(item)}>
                                                                    <ReplyIcon fontSize='small' />
                                                                </IconButton>
                                                                {item.sender._id === user.user._id &&
                                                                    <IconButton size='small' color="error" onClick={() => handleDelete(item._id)}>
                                                                        <DeleteOutlineIcon fontSize='small' />
                                                                    </IconButton>
                                                                }
                                                            </Box>
                                                        </Box>
                                                    </Paper>
                                                </Box>
                                            </ListItem>
                                        )
                                }
                            </React.Fragment>
                        )
                    })

                )}
            </List>
        </Box>
    )
}

export default ChatArea;
