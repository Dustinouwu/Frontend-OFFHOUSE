import React, { useContext, useState } from "react";
import './LoginAdmin.css';
import Title from "../../../components/atoms/Title/Title";
import Label from "../../../components/atoms/Label/Label";
import Imagenes from '../../../Imagenes';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts";
import axios from "axios";
import { Grid } from "@mui/material";



export const LoginAdmin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext);



    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://offhouse.herokuapp.com/api/login',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const { access_token, token_type, user } = response.data.data
            login(user, `${token_type} ${access_token}`);
            const { role } = user;
            if (role === 'admin') {
                navigate('/homeAdmin');
            } else {
                navigate('/home');
            }
            if (response.status === 422) {
                setError('')
            }
            window.location.reload()
        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message, 'error');

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
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                    }}
                />
            </Grid>

            <div className="login-container">
                <form className="formlogin" onSubmit={onLogin}>
                    <Title text='Inicio de Sesión OFFHOUSE'></Title>
                    {error &&
                        <label className="label-error-login">
                            {error}
                        </label>
                    }

                    <Label
                        text='CORREO'
                    />

                    <input
                        id="mailcre"
                        type='email'
                        value={email}
                        className="inputstyle"
                        placeholder="example@example.com"
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                    <Label
                        text='CONTRASEÑA'
                    />

                    <input
                        id="passwordcre"
                        type='password'
                        value={password}
                        className="inputstyle"
                        placeholder="********"
                        onChange={e => setPassword(e.target.value)}>

                    </input>
                    <div className="submit-button-container">
                        <button  >
                            INGRESAR
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h5>Crea tu cuenta</h5>

                        <div className="signup-container">
                            <h5>No eres miembro? </h5>
                            <Link to="createuser/*" ><h5 className="singupl">Regístrate</h5></Link>
                        </div>

                        <div className="signup-container">
                            <Link to="resetpssw/*" ><h5 className="singupl">¿No recuerdas tu contraseña?</h5></Link>
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

