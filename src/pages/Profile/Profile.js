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
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            'black',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
            backgroundColor: '#F2C94C'
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: 'black',
                marginRight: theme.spacing(1.5),
                
            },
            '&:active': {
                backgroundColor: '#F2C94C'
            },
        },
    },
}));


export const Profile = () => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [avatar, setAvatar] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getUser = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);
            setAvatar(response.data.data.avatar)

            console.log(response.data.data.avatar);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getUser()

    }, [])

    return (
        <div>
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

        </div >
    )
}

