import React, { useContext, useState } from "react";
import './Login.css';
import axios from "axios";
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Imagenes from '../../Imagenes';
import { AuthContext } from "../../contexts";
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";


export const Login = () => {

    /* TRAER LA FUNCIÓN */
    const { login } = useContext(AuthContext);
    /* NAVEGAR ENTRE RUTAS */
    const navigate = useNavigate();

    /* CONSTANTES EMAIL Y PASSWORD*/
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')

    /* PETICIÓN USUARIO POR API*/
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://offhouse.herokuapp.com/api/loginCust',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const { access_token, token_type, user } = response.data.data
            login(user, `${token_type} ${access_token}`);
            navigate('/home');
            if (response.status === 422) {
                setError('')
            } else {
                setError2('')
            }
            
        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message, 'error');

        }
    }


    return (
        <div className="main-container">

            <div className="image-container">
                <img src={Imagenes.img1} alt='Imagen Electrodomésticos'></img>
            </div>

            <div className="login-container">
                <form className="formlogin" onSubmit={onLogin}>
                    <Title text='Login to OFFHOUSE'></Title>
                    {error &&
                        <label className="label-error-login">
                            {error}                    
                        </label>
                    }
                    {error2 &&
                        <label className="label-error-login">
                            {error2}                    
                        </label>
                    }
                    <Label
                        text='USERNAME'
                    />

                    <input
                        id="email"
                        type='email'
                        value={email}
                        className="inputstyle"
                        placeholder="example@example.com"
                        onChange={e => setEmail(e.target.value)}>
                    </input>
                    <Label
                        text='PASSWORD'
                    />

                    <input
                        id="contraseña"
                        type='password'
                        value={password}
                        className="inputstyle"
                        placeholder="********"
                        onChange={e => setPassword(e.target.value)}>

                    </input>



                    <div className="submit-button-container">
                        <button>LOGIN </button>
                    </div>

                    <Button variant="contained" style={{ marginTop: '25px', backgroundColor: '#ff9900bd' }}>
                        <Link to="admin/*" style={{ textDecoration: 'none', color: 'white' }} >ROL: ADMINISTRADOR</Link>
                    </Button>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h5>Create your account</h5>

                        <div className="signup-container">
                            <h5>Not a member? </h5>
                            <Link to="/register" ><h5 className="singupl">Sign up</h5></Link>
                        </div>

                        <div className="signup-container">
                            <Link to="/resetpssw" ><h5 className="singupl">Don’t remember your password?</h5></Link>
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

