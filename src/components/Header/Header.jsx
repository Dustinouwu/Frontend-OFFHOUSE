import React, { useContext } from 'react'
import './Header.css';
import Imagenes from "../../Imagenes";
import Search from "../Search/Search";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { CiChat1 } from "react-icons/ci";
import { SlBell } from "react-icons/sl";
import { Avatar, Stack, Badge, IconButton } from '@mui/material'
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import axios from 'axios';
import { PhotoCamera } from '@mui/icons-material';

const Header = () => {

    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);
    const tokenUser = localStorage.getItem('token')
    console.log('nombreUsuario: ', user.username)
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

                    <Badge badgeContent={4} color="primary" invisible={false}>
                        <CiChat1 size="25px" />
                    </Badge>
                    <IconButton color="primary" aria-label="upload picture" component="label" onClick={onLogout}>
                        <input hidden accept="image/*"  />
                        <PhotoCamera />
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