import React from 'react';
import { Card, CardHeader, Avatar, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';

const Header = ({ roomData }) => {
    return (
        <Card sx={{ borderRadius: 0 }} elevation={0}>
            <CardHeader
                avatar={
                    <>
                        <Button sx={{ minWidth: "auto", mr: 1 }}>
                            <ArrowBackIcon />
                        </Button>
                        <Avatar>
                            {roomData?.receiver?.user?.name?.[0] || roomData?.room?.groupName?.[0] || 'R'}
                        </Avatar>
                    </>
                }
                action={
                    <>
                        <IconButton>
                            <VideoCallIcon />
                        </IconButton>
                        <IconButton>
                            <CallIcon />
                        </IconButton>
                    </>
                }
                title={roomData?.receiver?.user?.name || roomData?.room?.groupName || "Unknown"}
                subheader={
                    <Typography variant='caption'>
                        {roomData?.receiver?.user?.email || roomData?.room?.groupDescription || ""}
                    </Typography>
                }
            />
        </Card>
    );
}

export default Header;
