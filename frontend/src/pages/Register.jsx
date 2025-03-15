import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, TextField, Button, Paper, Box, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { jwtDecode } from "jwt-decode";

const Register = () => {
    const navigate = useNavigate();
    const [formError, setFormError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const isUserExist = sessionStorage.getItem("user");
    useEffect(() => {
        if (isUserExist) {
            navigate('/app', { state: JSON.parse(isUserExist) })
        }
    }, [])
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/register', data);
            if (response.data) {
                localStorage.setItem("accessToken", response.data.token);
                const user = jwtDecode(response.data.token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/app', { state: user });
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                setFormError(error.response.data.Error || 'An error occurred on the server');
            } else {
                setFormError('An unexpected error occurred. Please try again later.');
            }
        }
    };
    return (
        <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Grid container sx={{ height: "50%" }}>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
                    <Paper square sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#001E2B" }}>
                        <Box sx={{ p: 5, textAlign: "center" }}>
                            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                <svg width="50" height="50" color='#001E2B' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
                                    <circle cx="128" cy="128" r="114" stroke="#FFF" strokeWidth="20" fill="none" />
                                    <path d="M97.637 121.69c27.327-22.326 54.058-45.426 81.98-67.097-14.646 22.505-29.708 44.711-44.354 67.215-12.562.06-25.123.06-37.626-.119zM120.737 134.132c12.621 0 25.183 0 37.745.179-27.505 22.206-54.117 45.484-82.099 67.096 14.646-22.505 29.708-44.77 44.354-67.275z" />
                                </svg>
                                <svg width="50" height="50" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
                            </Box>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: "600", mt: 3 }}>
                                CHAT APP
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#001E2B" }}>
                                KLKWDOKO KW AOK DOWAK KWAK LWK AK OAWK KLK AWLK L
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
                    <Paper square sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ p: 5, flex: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
                            {formError && (
                                <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>
                            )}
                            <Typography variant='h5' sx={{ mb: 2, fontWeight: 500, textTransform: "uppercase" }}>Register HERE</Typography>
                            <TextField
                                fullWidth
                                id="name"
                                sx={{ mb: 3 }}
                                label="Name"
                                variant="outlined"
                                {...register('name', { required: "This field is required" })}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                            />
                            <TextField
                                fullWidth
                                id="email"
                                sx={{ mb: 3 }}
                                label="Email"
                                variant="outlined"
                                {...register('email', {
                                    required: { value: true, message: "This field is required" },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                sx={{ mb: 3 }}
                                label="Password"
                                variant="outlined"
                                type="password"
                                {...register('password', { required: "This field is required" })}
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                            />
                            <Button fullWidth type='submit' variant="contained" sx={{ py: 2, bgcolor: "#00ED64" }}>Register</Button>
                        </Box>
                        <Box sx={{ textAlign: "right", pr: 1, pb: 1 }}>
                            <Typography sx={{ color: "#001E2B" }}>
                                Already have an account? <Button onClick={() => navigate('/')} sx={{ color: "#001E2B" }}>Login</Button>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Register;
