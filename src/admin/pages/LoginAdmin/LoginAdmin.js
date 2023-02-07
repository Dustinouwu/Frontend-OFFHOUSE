import React, { useContext, useState } from "react";
import './LoginAdmin.css';
import Title from "../../../components/atoms/Title/Title";
import Label from "../../../components/atoms/Label/Label";
import Imagenes from '../../../Imagenes';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts";
import axios from "axios";
import { Alert, Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';


export const LoginAdmin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const errorMap = {
        'The email field is required.': 'El campo de correo es requerido',
        'The password field is required.': 'El campo de contraseña es requerido',
        'The email must be a valid email address.': 'El correo debe ser un correo valido',
        'The email has already been taken.': 'El correo ya se encuentra registrado',
        'The password must be at least 8 characters.': 'La contraseña debe tener al menos 8 caracteres',
        'The password confirmation does not match.': 'La confirmación de la contraseña no coincide',
        'The password confirmation field is required.': 'El campo de confirmación de la contraseña es requerido',
        'The password field is required.': 'El campo de contraseña es requerido',
        'The provided credentials are incorrect.': 'Las credenciales proporcionadas son incorrectas',
        'The email field is required. (and 1 more error)': 'El campo de correo es requerido',
    }

   
    const setErrorTranslated = (error) => {
        if (errorMap[error]) {
            setError(errorMap[error])
        } else {
            setError(error)
        }
    }

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
            setLoading(false);
            if (role === 'admin') {
                navigate('/homeAdmin');
            } else {
                navigate('/home');
            }
            window.location.reload()
        } catch (error) {
            if (error.response.data.message) {
                setErrorTranslated(error.response.data.message)
            } else {
                setErrorTranslated(error.response.data.errors)
            }

            console.log(error.response.data.message, 'error');
            setLoading(false);

        }
    }

    return (
        <div className="main-container">
            {loading && <CircularProgress />}
            <Grid container component="main" sx={{ height: '100vh',[`@media (max-width: 900px)`]: { display: 'none' } }}>
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
                <form className="formlogin" onSubmit={onLogin}>
                    <Title text='Inicio de Sesión OFFHOUSE'></Title>
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
                            <Link to="createuser" ><h5 className="singupl">Regístrate</h5></Link>
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

