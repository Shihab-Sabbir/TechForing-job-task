import { Box, Button, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <Box
         sx={{
            bgcolor: 'primary.main',
            py: 8,
         }}
      >
         <Container>
            <Box
               sx={{
                  display: 'flex',
                  justiFyContent: 'space-between',
                  alignItems: 'center',
               }}
            >
               <Typography
                  sx={{
                     fontSize: '1.5rem',
                     color: '#fff',
                     flex: 1,
                  }}
               >
                  Tech Foring
               </Typography>
               <Box
                  sx={{
                     display: 'flex',
                     justiFyContent: 'space-between',
                     alignItems: 'center',
                  }}
               >
                  <Typography
                     sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                     }}
                  >
                     Career
                  </Typography>
                  <Button
                     sx={{
                        bgcolor: 'white',
                        '&:hover': {
                           bgcolor: 'primary',
                        },
                        ml: 2,
                     }}
                  >
                     <Link to='/home'> Current Vaccancy</Link>
                  </Button>
               </Box>
            </Box>
            <Divider
               sx={{
                  mt: 3,
                  bgcolor: 'rgba(255,255,255,0.5)'
               }}
            />
         </Container>
      </Box>
   );
};

export default Footer;
