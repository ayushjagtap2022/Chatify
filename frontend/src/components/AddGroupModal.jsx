import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Chip, Box } from '@mui/material';
import { toast } from 'react-toastify';  // Import toast

const AddGroupModal = ({ open, onClose }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    const handleFormSubmit = async () => {
        const formattedUsers = users.map((user, index) => ({
            name: user.username,
            email: user.email,
            id: index + 1,
        }));

        const groupData = { groupName, groupDescription, members: formattedUsers };

        try {
            console.log(groupData);

            const response = await fetch('http://localhost:5000/api/v1/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupData),
            });

            if (!response.ok) {
                throw new Error('Failed to add group: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Group added successfully:', data);
            toast.success('Group created successfully!');  // Show success toast

        } catch (error) {
            console.error('Error adding group:', error);
            toast.error('Error adding group: ' + error.message);  // Show error toast
        }

        onClose();
        setGroupName('');
        setGroupDescription('');
        setUsers([]);
    };

    const handleAddUser = () => {
        if (username && email) {
            setUsers([...users, { username, email }]);
            setUsername('');
            setEmail('');
        }
    };

    const handleRemoveUser = (userToRemove) => {
        setUsers(users.filter(user => user.username !== userToRemove.username));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Group</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the details for the new group.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Group Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Group Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                />

                <Box mt={2}>
                    <TextField
                        margin="dense"
                        label="Username"
                        fullWidth
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleAddUser} sx={{ mt: 1 }}>Add User</Button>
                </Box>

                <Box mt={2}>
                    {users.map((user, index) => (
                        <Chip
                            key={index}
                            label={user.username}
                            onDelete={() => handleRemoveUser(user)}
                            color="primary"
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Add Group
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddGroupModal;
