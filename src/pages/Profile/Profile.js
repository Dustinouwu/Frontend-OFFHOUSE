import { IconButton } from '@chakra-ui/react';
import './Profile.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { Button } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const style = {
    width: '100%',
    maxWidth: '100%',
    bgcolor: 'background.paper',
    borderTop: '1px solid   #e0e0e0',
    borderLeft: '1px solid   #e0e0e0',
    borderRight: '1px solid   #e0e0e0',
    borderBottom: '1px solid   #e0e0e0',
};


export const Profile = () => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [avatar, setAvatar] = useState([])
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        id: '',

    })

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);
            setAvatar(response.data.data.avatar)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', gap: '3rem', marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                <Card sx={{ maxWidth: 350 }}>
                    <CardActionArea>
                        {
                            loading ? (
                                <Box sx={{ display: 'flex',width: '20vh', justifyContent: 'center' }}>
                                    <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                                </Box>
                            ) : (
                                <CardMedia
                                    component="img"
                                    image={avatar}
                                    style={{ width: '50%', marginBottom: '5%', display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: '25%', marginTop: '10%', borderRadius: '25px' }}
                                    alt="avatar user"
                                />
                            )
                        }

                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" align='center'>
                                {user.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align='center'>
                                {user.email}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                        <Button size="small" color="primary" variant="contained" onClick={() => navigate('/productlist')} >
                            Mis productos
                        </Button>
                    </CardActions>
                </Card>
                <List sx={style} component="nav" aria-label="mailbox folders" >
                    <ListItem >
                        <ListItemText primary="Nombre" />
                        <ListItemText secondary={user.first_name} align='center' />
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <ListItemText primary="Apellido" />
                        <ListItemText secondary={user.last_name} align='center' />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="Email" />
                        <ListItemText secondary={user.email} align='center' />
                    </ListItem>
                    <Divider />
                    <ListItem >
                        <ListItemText primary="Teléfono" />
                        <ListItemText secondary={user.home_phone} align='center' />
                    </ListItem>
                    <Divider />
                    <ListItem >
                        <ListItemText primary="Celular" />
                        <ListItemText secondary={user.personal_phone} align='center' />
                    </ListItem>
                    <Divider />
                    <ListItem >
                        <ListItemText primary="Dirección" />
                        <ListItemText secondary={user.address} align='center' />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ mt: '1.6%' }}>
                        <Button size="small" color="primary" variant="contained" placement="bottom" onClick={() => navigate('/editProfile')}>
                            Editar
                        </Button>
                    </ListItem>
                </List>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', marginTop: '2%', marginLeft: '5%', marginRight: '5%' }}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div" align='center'>
                                Actualizar la contraseña
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>

                        <Button size="small" color="primary" variant="contained" onClick={() => navigate('/EditPassword')} >
                            <KeyIcon />
                            Contraseña
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div" align='center'>
                                Cambiar Imagen de perfil
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>

                        <Button size="small" color="primary" variant="contained" onClick={() => navigate('/EditAvatar')} >
                            <AccountCircleIcon />
                            Avatar
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div" align='center'>
                                Ver mis productos con suscriptoción
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ display: "flex", justifyContent: "center" }}>

                        <Button size="small" color="primary" variant="contained" onClick={() => navigate('/productsprimium')} >
                            <WorkspacePremiumIcon />
                            Productos Premium
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>


    )
}



{/* <div>
            <div className='profile-main' style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%', marginBottom: '5%', paddingTop: '5%', paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', borderRadius: '35px', backgroundColor: '#D9D9D9' }} >
                <div style={{ display: 'flex', gap: '6rem', marginLeft: '5%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '15%' }}>
                        <img src={avatar} alt="avatar" style={{ width: '80%', marginBottom: '5%' }} />
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                            style={{ backgroundColor: '#F2C94C', color: 'black', width: '100%', marginBottom: '5%' }}
                        >
                            Mi cuenta
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} disableRipple>
                                <Link to="/editProfile" style={{ textDecoration: 'none', color: 'rgb(55, 65, 81)' }} >
                                    <ModeEditIcon />
                                    Editar Perfil
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                <Link to="/productlist" style={{ textDecoration: 'none', color: 'rgb(55, 65, 81)' }}>
                                    <Inventory2Icon />
                                    Mis productos
                                </Link>
                            </MenuItem>
                            
                        </StyledMenu>
                        
                    </div>

                    <h1 id='labprofile' style={{ display: 'flex', alignItems: 'flex-start', margin: 'auto' }}>{user.username}</h1>
                </div>
                <Divider sx={{ my: 0.5 }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', gap: '10%', marginTop: '5%' }}>

                    <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>

                        <h2 id='labelprod'>Nombre:</h2>
                        <h2 id='labelprod'>Apellido:</h2>
                        <h2 id='labelprod'>Email:</h2>
                        <h2 id='labelprod'>Teléfono:</h2>
                        <h2 id='labelprod'>Celular:</h2>
                        <h2 id='labelprod'>Dirección:</h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>

                        <h2 id='labelprod'>{user.first_name}</h2>
                        <h2 id='labelprod'>{user.last_name}</h2>
                        <h2 id='labelprod'>{user.email}</h2>
                        <h2 id='labelprod'>{user.home_phone}</h2>
                        <h2 id='labelprod'>{user.personal_phone}</h2>
                        <h2 id='labelprod'>{user.address}</h2>
                    </div>
                </div>



            </div>

        </div > */}