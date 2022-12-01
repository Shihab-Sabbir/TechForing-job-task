import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../UserContext/UserContext';

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const { user, setUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('username')
        const email = data.get('email')
        const password = data.get('password')
        if (email === '') {
            toast.error('Email is missing !')
            return;
        }
        if (password === '' || password.length < 6) {
            toast.error('Password should be at least 6 digit !')
            return;
        }
        if (name === '') {
            toast.error('Name is missing !')
            return;
        }
        const userData = { name, email, password };
        setLoading(true)
        fetch('https://tech-foring-assignment.vercel.app/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userData }),
        }).then(res => res.json()).then(data => {
            if (data.insertedId && data.acknowledged) {
                toast.success('Registration successful !');
                setLoading(false)
                navigate('/login')
            }
        }).catch(err => { console.log(err); setLoading(false) })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    mt: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="User Name"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/login' className='cursor-pointer' variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
