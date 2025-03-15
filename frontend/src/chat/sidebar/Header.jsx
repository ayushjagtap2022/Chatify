import React, { useState } from 'react';
import { Card, CardHeader, Avatar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddGroupModal from '../../components/AddGroupModal';

const Header = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddGroupClick = () => {
        setOpenDialog(true);
        handleMenuClose();
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    return (
        <>
            <Card sx={{ bgcolor: "#14A44D", borderRadius: 0, color: "primary.contrastText" }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            {user.user.name.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <>
                            <IconButton
                                aria-label="settings"
                                sx={{ color: "primary.contrastText" }}
                                onClick={handleMenuOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleAddGroupClick}>Add Group</MenuItem>
                            </Menu>
                        </>
                    }
                    title={user.user.name}
                    subheader={
                        <Typography variant="caption">
                            {user.user.email}
                        </Typography>
                    }
                />
            </Card>


            <AddGroupModal
                open={openDialog}
                onClose={handleDialogClose}

            />
        </>
    );
};

export default Header;
