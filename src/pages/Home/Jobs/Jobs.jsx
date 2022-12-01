import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../UserContext/UserContext';
import DataLoadingSpinner from '../../../component/Loader/DataLoadingSpinner';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false)
    const { refetch, setRefetch } = React.useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true)
        axios.get('https://tech-foring-assignment.vercel.app/job', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('task-token')}`
            }
        }).then(res => { setJobs(res.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
    }, [refetch])

    const handleDelete = (catId, jobId) => {
        confirmAlert({
            message: 'Are you sure to remove this job ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        axios.delete(`https://tech-foring-assignment.vercel.app/job?category=${catId}&jobId=${jobId}`, {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('task-token')}`
                            }
                        }).then(res => { setLoading(false); setRefetch(!refetch) }).catch(err => { console.log(err); setLoading(false) })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { setLoading(false) }
                }
            ]
        });

    }
    const handleEdit = (catId, job) => {
        const data = { catId, job }
        navigate('/edit-job',
            {
                state: {
                    data
                }
            })
    }
    if (loading) {
        return <DataLoadingSpinner />
    }
    if (jobs.length === 0) {
        return <Box fullWidth sx={{ mb: 5 }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                No Vaccancy Now !
            </Typography>
        </Box>
    }
    return (
        <Box fullWidth sx={{ mb: 5 }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Jobs
            </Typography>
            {
                jobs?.map(job =>
                    <Box key={job._id}>
                        <Accordion fullWidth sx={{ mb: 1 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{job?.category}</Typography>
                            </AccordionSummary>
                            {job.job?.length > 0 ? job.job?.map((item, idx) =>
                                <AccordionDetails key={idx} fullWidth>
                                    <Box sx={{ display: "flex", justifyContent: 'between', alignItems: 'start' }}>
                                        <Box sx={{ minWidth: '80%' }}>
                                            <Typography component="h6" variant="h6">
                                                Title : {item.title}
                                            </Typography>
                                            <Typography component="p">
                                                Description : {item.details}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <button onClick={() => handleEdit(job._id, item)} >Edit</button>
                                            <br></br>
                                            <button onClick={() => handleDelete(job._id, item.id)}>Delete</button>
                                        </Box>
                                    </Box>

                                </AccordionDetails>
                            ) : <AccordionDetails>No job in this Category !</AccordionDetails>}
                        </Accordion>
                    </Box>
                )
            }

        </Box>
    )
}

export default Jobs;