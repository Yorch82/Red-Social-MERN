import './AppBar.scss'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Input} from "antd";
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { Navigate } from "react-router-dom";
const API_URL = "http://localhost:8080/assets/";

const pages = [''];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  
  const [text, setText] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);    
    if (e.key === "Enter") {
      navigate('/search/'+ text);
    }    
  };

  if (pathname === '/' || pathname === '/register')
  return null;

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    notification.success({ message: "Get the F*@!K out!!" });
    navigate("/");
  };

 return (
   <AppBar position='static'>
     <Container maxWidth='xl'>
       {user ? (
         <Toolbar disableGutters>
           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
           <Typography
             variant='h6'
             noWrap
             component='a'
             href='/home'
             sx={{
               mr: 2,
               display: { xs: 'none', md: 'flex' },
               fontFamily: 'Victor Mono',
               fontWeight: 700,
               letterSpacing: '.3rem',
               color: 'inherit',
               textDecoration: 'none',
             }}
           >
             Code my Meme
           </Typography>

           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
             <IconButton
               size='large'
               aria-label='account of current user'
               aria-controls='menu-appbar'
               aria-haspopup='true'
               onClick={handleOpenNavMenu}
               color='inherit'
             >
               <MenuIcon />
             </IconButton>
             <Menu
               id='menu-appbar'
               anchorEl={anchorElNav}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'left',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'left',
               }}
               open={Boolean(anchorElNav)}
               onClose={handleCloseNavMenu}
               sx={{
                 display: { xs: 'block', md: 'none' },
               }}
             >
               {pages.map(page => (
                 <MenuItem key={page} onClick={handleCloseNavMenu}>
                   <Typography textAlign='center'>{page}</Typography>
                 </MenuItem>
               ))}
             </Menu>
           </Box>
           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
           <Typography
             variant='h5'
             noWrap
             component='a'
             href=''
             sx={{
               mr: 2,
               display: { xs: 'flex', md: 'none' },
               flexGrow: 1,
               fontFamily: 'Victor Mono',
               fontWeight: 700,
               letterSpacing: '.3rem',
               color: 'inherit',
               textDecoration: 'underline',
             }}
           >
             Code my Meme
           </Typography>
           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             {pages.map(page => (
               <Button
                 key={page}
                 onClick={handleCloseNavMenu}
                 sx={{ my: 2, color: 'white', display: 'block' }}
               >
                 {page}
               </Button>
             ))}
           </Box>
           {user.user?.role === 'admin' ? (
             <span className='admin'>
               <Link to='/admin'>Admin</Link>
             </span>
           ) : (
             ''
           )}
           <Box sx={{ flexGrow: 0 }}>
             <Tooltip title='Open settings'>
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                 <Avatar alt='Remy Sharp' src={API_URL + user.user?.avatar} />
               </IconButton>
             </Tooltip>
             <Menu
               sx={{ mt: '45px' }}
               id='menu-appbar'
               anchorEl={anchorElUser}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorElUser)}
               onClose={handleCloseUserMenu}
             >
               <MenuItem>
                 <Typography textAlign='center'>
                   <Link to='/profile'>Profile</Link>
                 </Typography>
               </MenuItem>
               <MenuItem>
                 <Typography textAlign='center'>
                   <Link to='/SignInSide' onClick={onLogout}>
                     Logout
                   </Link>
                 </Typography>
               </MenuItem>
             </Menu>
           </Box>
           <Box className='inputcont'>
             <Input className='inputBar' onKeyUp={handleChange} placeholder="Search post..." name="text" />                      
           </Box>             
         </Toolbar>
       ) : (
         <Navigate to='/' />
       )}
     </Container>
   </AppBar>
 );
};
export default ResponsiveAppBar;
