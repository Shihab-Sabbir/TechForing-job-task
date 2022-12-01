import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import React from 'react'
import loaderGif from '../../asset/loderGif.gif'
function DataLoadingSpinner() {
    return <Box sx={{
        mt: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography component="h1" variant="h5">
            Loading...
        </Typography>
    </Box>
}

export default DataLoadingSpinner;