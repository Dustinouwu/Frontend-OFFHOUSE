import React, { useState } from 'react';
import './ResetPassword.css';
import Title from "../../components/atoms/Title/Title";
import Label from "../../components/atoms/Label/Label";
import Imagenes from '../../Imagenes';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Grid } from '@mui/material';
import axios from 'axios';



export const FormResetPassword = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const { tokendos } = useParams();


    const forgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'https://offhouse.herokuapp.com/api/reset-password',
                { email, password, password_confirmation, token: tokendos },
                { headers: { 'accept': 'application/json' } }
            )
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message)
            } else if (error.response && error.response.status === 422) {
                setError('Se requiere un correo ');
            } else if (error.response && error.response.status === 404) {
                setError('No se ha encontrado ha encontrado un correo asociado en nuestro sistema');
            } else if (error.response && error.response.status === 403) {
                setError('El usuario ya se encuentra autenticado');
            }
            console.log(error.response.data.message, 'error');
            console.error(error);
        }
    }

    return (
        <div className="main-container">


            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1632923565835-6582b54f2105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                    }}
                />
            </Grid>


            <div className="login-container">
                <form className="formlogin" onSubmit={forgotPassword}>
                    <Title text='Restablecer de contraseña '></Title>
                    {error &&
                        <Alert severity="error" sx={{ mb: '3%' }}>{error}</Alert>
                    }
                    <Label
                        text='CORREO'
                    />

                    <input
                        id="mailcre"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputstyle"
                        placeholder="example@example.com"
                    >
                    </input>
                    <Label
                        text='CONTRASEÑA'
                    />

                    <input
                        id="password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputstyle"
                        placeholder="************"
                    >
                    </input>
                    <Label
                        text='CONFIRMACIÓN DE CONTRASEÑA'
                    />

                    <input
                        id="password"
                        type='password'
                        value={password_confirmation}
                        onChange={(e) => setPassword_confirmation(e.target.value)}
                        className="inputstyle"
                        placeholder="************"
                    >
                    </input>


                    <div className="submit-button-container">
                        <button>CONFIRMAR </button>
                    </div>



                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h5>Crea tu cuenta</h5>

                        <div className="signup-container">

                            <Link to="/*" ><h5 className="singupl">Ya tienes una cuenta?</h5></Link>
                        </div>




                    </div>
                </form>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>


        </div >
    )

}

