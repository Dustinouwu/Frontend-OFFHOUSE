import React, { useContext } from 'react'
import './Header.css';
import Imagenes from "../../../Imagenes";
import Search from "../../Search/Search";
import Nav from "../Nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, IconButton } from '@mui/material'
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../../contexts';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const Header = () => {

    const navigate = useNavigate(); // Función para navegar
    const { user, logout } = useContext(AuthContext); // Función para traer la función para logout
    const tokenUser = localStorage.getItem('token') // Función para traer el token del usuario
    
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

    return (
        <div >

            <div className="header-container">

                <div className='lhd-container'>
                    <Link to="/home">
                        <img src={Imagenes.img4} alt="logo" />
                    </Link>
                    <h1>OFF HOUSE</h1>
                </div>

                <form id='formsearch'>
                    <Search />

                </form>

                <div className='other-container'>
                    <Link to="/chat">
                        <Badge badgeContent={4} color="primary" invisible={false}>
                            <ChatBubbleOutlineIcon size="25px"  style={{ color: 'black' }}/>
                        </Badge>
                    </Link>

                    <IconButton color="primary" aria-label="upload picture" component="label" onClick={onLogout}>
                        <input hidden accept="image/*" />
                        <LogoutIcon style={{ color: 'black' }} />
                    </IconButton>


                    <Avatar
                        id="avatar-header"
                        alt={user.username}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 45, height: 45 }}
                        overlap="circular"
                    />
                </div>

            </div>

            <div className='navv-container'>
                <Nav />
            </div>
            <Outlet />
        </div>
    )
}

export default Header