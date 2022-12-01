import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DataLoadingSpinner from '../../component/Loader/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';

function AddJob() {
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(false)
    const { refetch, setRefetch } = React.useContext(AuthContext);
    const naivigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title');
        const details = data.get('details');
        const category = data.get('category');
        const id = new Date().valueOf();
        const job = { title, details, category, id }
        if (title === '' || details === '', category === '') {
            toast.error('All field should be filled')
            return;
        }
        else {
            setLoading(true)
            axios.post('https://tech-foring-assignment.vercel.app/add-job', job).then(res => {
                if (res.status === 200) {
                    setRefetch(!refetch)
                    setLoading(false)
                    naivigate('/home')
                }
            }).catch(err => { console.log(err); setLoading(false) })
        }
    }
    const handleChange = (e) => {
        setCategory(e.target.value);
    }
    if (loading) {
        return <DataLoadingSpinner />
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Add Job
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Job Title"
                        name="title"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="details"
                        label="Job Details"
                        name="details"
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            required
                            labelId="category"
                            id="category"
                            value={category}
                            label="category"
                            name='category'
                            onChange={handleChange}
                        >
                            <MenuItem value={'Sales & Marketing'}>Sales & Marketing</MenuItem>
                            <MenuItem value={'Creative'}>Creative</MenuItem>
                            <MenuItem value={'Human Resource'}>Human Resource</MenuItem>
                            <MenuItem value={'Administration'}>Administration</MenuItem>
                            <MenuItem value={'Digital Marketing'}>Digital Marketing</MenuItem>
                            <MenuItem value={'Development'}>Development</MenuItem>
                            <MenuItem value={'Engineering'}>Engineering</MenuItem>
                        </Select>
                    </FormControl>


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default AddJob;