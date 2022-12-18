import React from 'react'
import './Header.css';
import Imagenes from "../../Imagenes";
import Search from "../Search/Search";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { CiChat1 } from "react-icons/ci";
import { SlBell } from "react-icons/sl";
import { Avatar, Stack, Badge } from '@mui/material'
import { Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <div >

            <div className="header-container">

                <div className='lhd-container'>
                    <Link to="/home">
                        <img src={Imagenes.img4} alt="logo" />
                    </Link>
                    <h1>OFF HOUSE</h1>
                </div>

                <form>
                    <Search />

                </form>

                <div className='other-container'>

                    <Badge badgeContent={4} color="primary" invisible={false}>
                        <CiChat1 size="25px" />
                    </Badge>

                    <SlBell size="25px" />
                    <Avatar
                        id="avatar-header"
                        alt="Remy Sharp"
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