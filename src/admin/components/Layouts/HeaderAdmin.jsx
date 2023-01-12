import React, { useContext } from 'react'
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
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderAdmin = () => { 

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const navigate = useNavigate(); // Función para navegar
  const { user, logout } = useContext(AuthContext); // Función para traer la función para logout
  const tokenUser = localStorage.getItem('token') // Función para traer el token del usuario
  const config = {
    headers: { Authorization: `${tokenUser}` }
  };

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
  return (
    <div>
      <div st>
        <AppBar position="static" sx={{backgroundColor: '#FF9901'}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>

              <MotionPhotosAutoIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/homeAdmin"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ADMIN OFFHOUSE
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
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

                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Usuarios</Typography>
                  </MenuItem>
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Categorías</Typography>
                  </MenuItem>

                </Menu>
              </Box>
              <MotionPhotosAutoIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                OFF-HOUSE
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    onClick={() => navigate(`/crudusers`)}
                    
                    sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: 'white' } }}
                  >
                   Usuarios
                  </Button>
                  <Button
                    onClick={() => navigate(`/crudcateg`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                   Categorías
                  </Button>
                  <Button
                    onClick={() => navigate(`/crudcoms`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                   Comentarios
                  </Button>
                  <Button
                    onClick={() => navigate(`/crudreports`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                   Reportes
                  </Button>
                  <Button
                    onClick={() => navigate(`/crudproducts`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                   Productos
                  </Button>
                  <Button
                    onClick={() => navigate(`/crudsubscription`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                   Suscripción
                  </Button>

              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
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
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Cierre de sesión
                  </MenuItem>

                </Menu>
              </Box>
            </Toolbar>
          </Container>

        </AppBar >
      </div>
      <Outlet />
    </div>
  );
}
export default HeaderAdmin;