import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => {
   return (
      <Box>
         <Container>
            <Header />
            <div className='min-h-screen'>
               <Outlet />
            </div>
         </Container>
         <Footer />
      </Box>
   );
};

export default Layout;
