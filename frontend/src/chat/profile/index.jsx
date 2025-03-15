import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user, socketRef }) => {
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        socketRef.current.disconnect();
        navigate('/')
    }
    return (
        <Box sx={{ background: "#eee", width: "30vw", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Avatar src="https://mui.com/static/images/avatar/2.jpg" sx={{
                width: "156px", height: "156px"
            }} />
            <Typography variant='h4' sx={{ textTransform: "uppercase", color: "primary.light", mt: 3 }}></Typography>
            <Typography variant='subtitle1'>Computer Engineer</Typography>
            <Typography variant='body2'>{user.user.email}</Typography>
            <Button onClick={logoutUser} variant='contained' sx={{ mt: 2 }}>Logout</Button>
        </Box>
    )
}

export default Profile