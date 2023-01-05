import { IconButton } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const Profile = () => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [avatar, setAvatar] = useState([])

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
            <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%', paddingTop: '5%', paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', borderRadius: '35px', backgroundColor: '#D9D9D9' }} >
                <div style={{ display: 'flex', gap: '6rem', marginLeft: '5%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '15%' }}>
                        <img src={avatar} alt="avatar" style={{ width: '80%', marginBottom: '5%' }} />
                        <Link to="/editProfile" underline="none">
                            <Button
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                                variant="contained"

                            >
                                <ModeEditIcon />
                                EDITAR PERFIL

                            </Button>
                        </Link>

                    </div>

                    <h1 id='labelprod'>{user.username}</h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <h2 id='labelprod'>Nombre: {user.first_name} </h2>
                    <h2 id='labelprod'>Apellido: {user.last_name} </h2>
                    <h2 id='labelprod'>Email: {user.email} </h2>
                    <h2 id='labelprod'>Teléfono: {user.home_phone} </h2>
                    <h2 id='labelprod'>Celular: {user.personal_phone} </h2>
                    <h2 id='labelprod'>Dirección: {user.address} </h2>

                </div>



            </div>

        </div >
    )
}

