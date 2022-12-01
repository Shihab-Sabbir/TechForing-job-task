import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import DataLoadingSpinner from '../../component/Loader/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';

function EditJob() {
    const [loading, setLoading] = useState(false)
    const naivigate = useNavigate();
    const { state } = useLocation();
    const title = state.data.job.title;
    const details = state.data.job.details;
    const { refetch, setRefetch } = React.useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title');
        const details = data.get('details');
        const category = state.data.job.category;
        const id = state.data.job.id;
        const job = { title, details, category, id }
        if (title === '' || details === '', category === '') {
            toast.error('All field should be filled')
            return;
        }
        else {
            setLoading(true)
            axios.put(`https://tech-foring-assignment.vercel.app/edit-job?category=${state.data.catId}&jobId=${state.data.job.id}`, job, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('task-token')}`
                }
            }).then(res => {
                if (res.status === 200) {
                    setRefetch(!refetch)
                    setLoading(false)
                    naivigate('/home')
                }
            }).catch(err => console.log(err))
        }
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
                        defaultValue={title}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="details"
                        label="Job Details"
                        name="details"
                        defaultValue={details}
                    />
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

export default EditJob;