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
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../UserContext/UserContext';
import DataLoadingSpinner from '../../component/Loader/DataLoadingSpinner';

export default function Login() {
    const [loading, setLoading] = React.useState(false)
    const { user, setUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        if (email === '') {
            toast.error('Email is missing !')
            return;
        }
        if (password === '') {
            toast.error('Password is missing !')
            return;
        }
        setLoading(true)
        fetch(`https://tech-foring-assignment.vercel.app/jwt`, {
            headers: {
                email: email,
                password: password
            }
        }).then(res => {
            if (res.status === 403) {
                setLoading(false)
                toast.error('User is not registered, please register !');
                return;
            }
            if (res.status === 404) {
                setLoading(false)
                toast.error('email/password incorrect')
                return;
            }
            return res.json()
        }).then(data => {
            if (data.token) {
                toast.success('Login successful !');
                navigate('/home')
                setLoading(false);
                setUser(true);
                localStorage.setItem('task-token', data.token);
            }
        }).catch(err => { console.log(err); setLoading(false) })
    };
    const handleLogout = () => {
        setLoading(true)
        setUser(false);
        localStorage.removeItem('task-token');
        setLoading(false)
        navigate('/login')
    }
    if (loading) {
        return <DataLoadingSpinner />
    }
    if (user) {
        return <Box sx={{
            mt: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Button sx={{ border: '1px solid' }} onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    }
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
                autoComplete="off"
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
