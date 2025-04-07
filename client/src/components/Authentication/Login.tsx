import React from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
const Login: React.FC = () => {
    return (
        <Container
            maxWidth="sm"
            >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    marginTop: 8,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Welcome
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    sx={{
                        marginBottom: 3,
                    }}
                >
                    Please login to your account
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                            padding: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            borderRadius: 2,
                            backgroundColor: '#00a884',
                            // '&:hover': {
                            //     background: '#71eb85',
                            // },
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;