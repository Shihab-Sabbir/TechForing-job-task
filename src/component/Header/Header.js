import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function Header(props) {
   const { window } = props;
   const [drawerOpen, setDraweOpen] = React.useState(false);
   const { user } = React.useContext(AuthContext)
   const handleDrawerToggle = () => {
      setDraweOpen(!drawerOpen);
   };

   const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
         <Typography variant='h6' sx={{ my: 2 }}>
            Find Job
         </Typography>
         <Divider />
         <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <navItems>
               <Link to='/home'>
                  Home
               </Link>
            </navItems>
            <navItems>
               <Link to='/add-job'>
                  Add Job
               </Link>
            </navItems>
            <navItems>
               {!user && <Link to='/login'>
                  Login
               </Link>}
               {user && <Link to='/login'>
                  Logout
               </Link>}
            </navItems>
         </List>
      </Box>
   );

   const container =
      window !== undefined ? () => window().document.body : undefined;

   return (
      <Box sx={{ display: 'flex' }}>
         <AppBar
            component='nav'
            sx={{
               backgroundColor: 'transparent',
               boxShadow: 'none',
               mt: 2,
               position: 'static'
            }}
         >
            <Container>
               <Toolbar>
                  <IconButton
                     color='inherit'
                     aria-label='open drawer'
                     edge='start'
                     onClick={handleDrawerToggle}
                     sx={{
                        mr: 2,
                        display: { md: 'none' },
                        backgroundColor: 'primary.main',
                        '&:hover': {
                           backgroundColor: 'primary.main',
                        },
                     }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Box
                     sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
                  >
                     <img
                        src='https://i.ibb.co/JsvBDwD/logo.png'
                        alt=''
                        style={{
                           width: '150px',
                        }}
                     />
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                     <Button
                        sx={{
                           bgcolor: 'primary',
                        }}
                     >
                        <Link to='/home'>
                           Home
                        </Link>
                     </Button>
                     <Button
                        sx={{
                           bgcolor: 'primary',
                        }}
                     >
                        <Link to='/add-job'>
                           Add Job
                        </Link>
                     </Button>
                     <Button
                        sx={{
                           bgcolor: 'primary',
                        }}
                     >
                        {!user && <Link to='/login'>
                           Login
                        </Link>}
                        {user && <Link to='/login'>
                           Logout
                        </Link>}
                     </Button>
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
         <Box component='nav'>
            <Drawer
               container={container}
               variant='temporary'
               open={drawerOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                  },
               }}
            >
               {drawer}
            </Drawer>
         </Box>
         <Box component='main'>
            <Toolbar />
         </Box>
      </Box>
   );
}
