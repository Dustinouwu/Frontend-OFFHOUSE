import React, { useContext, useEffect, useState } from 'react'
import './Header.css';
import Imagenes from "../../../Imagenes";
import Search from "../../Search/Search";
import Nav from "../Nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, IconButton } from '@mui/material'
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../../contexts';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import NewHeader from './NewHeader';
import Footer from '../Footer/Footer';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InfoIcon from '@mui/icons-material/Info';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const Header = () => {

    const navigate = useNavigate(); // Función para navegar
    const { user, logout } = useContext(AuthContext); // Función para traer la función para logout
    const tokenUser = localStorage.getItem('token') // Función para traer el token del usuario
    const [avatar, setAvatar] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    // Función para cerrar sesión
    const onLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://offhouse.herokuapp.com/api/logout',
                { headers: { 'accept': 'application/json' } },
                config
            )
            logout()
            navigate('/login')
        } catch (error) {
            console.log(error.response.data.message, 'error');
        }
    }



    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/profile`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                setAvatar(response.data.data.avatar);
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [])

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => { navigate('/home'); handleMobileMenuClose() }}>
                <IconButton size="large" color="inherit">
                    <HomeIcon />
                </IconButton>
                <p>Página principal</p>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/chats'); handleMobileMenuClose() }}>
                <IconButton size="large" color="inherit">
                    <ChatBubbleTwoToneIcon />
                </IconButton>
                <p>Chat</p>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/categories'); handleMobileMenuClose() }}>
                <IconButton size="large" color="inherit">
                    <CategoryIcon />
                </IconButton>
                <p>Categorías</p>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/CreateProduct'); handleMobileMenuClose() }}>
                <IconButton size="large" color="inherit">
                    <NoteAddIcon />
                </IconButton>
                <p>Crea tu producto</p>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/help'); handleMobileMenuClose() }}>
                <IconButton size="large" color="inherit">
                    <InfoIcon />
                </IconButton>
                <p>Información</p>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/productlist'); handleMobileMenuClose() }}>
                <IconButton size="large" color="inherit">
                    <BusinessCenterIcon />
                </IconButton>
                <p>Mis productos</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Mi Perfil</p>
            </MenuItem>
        </Menu>
    );


    return (
        <div >
            <div className="header-container">

                <div className='lhd-container'>

                    <img src={Imagenes.img4} alt="logo" id='imglogo' onClick={() => navigate('/home')} />
                    <h1 id='theader' onClick={() => navigate('/home')} >OFF HOUSE</h1>
                    <div id='prueba'>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </div>
                </div>

                <form id='formsearch'>
                    <Search />

                </form>

                <div className='other-container'>
                    <Link to="/chats">
                        <ChatBubbleOutlineIcon size="25px" sx={{ color: 'black', display: 'block', [`@media (max-width: 650px)`]: { display: 'none' } }} />
                    </Link>

                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2, [`@media (max-width: 650px)`]: { display: 'none' } }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar id="avatar-header"
                                    alt={user.username}
                                    src={avatar}
                                    sx={{ width: 45, height: 45 }}
                                    overlap="circular">
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'rgb(55, 65, 81)' }} >
                            <MenuItem>
                                <Avatar

                                    src="/static/images/avatar/1.jpg"

                                    overlap="circular" />
                                Mi perfil
                            </MenuItem>
                        </Link>
                        <Divider />

                        <MenuItem onClick={onLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Cierre de sesión
                        </MenuItem>
                    </Menu>

                </div>
                {renderMobileMenu}
            </div>

            <div className='navv-container'>
                <Nav />
            </div>
            <div>

            </div>
            <Outlet />
        </div>
    )
}

export default Header