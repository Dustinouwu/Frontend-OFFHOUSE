import React, { useContext, useState } from "react";
import './LoginAdmin.css';
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Imagenes from '../../Imagenes';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import axios from "axios";
import { Button } from "@mui/material";



export const LoginAdmin = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')

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
            navigate('/homeadmin');
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
                        <button  >
                            LOGIN
                        </button>
                    </div>

                    <Button variant="contained" style={{ marginTop: '25px', backgroundColor: '#ff9900bd' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }} >ROL: USUARIO</Link>
                    </Button>


                </form>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>


        </div >
    )

}

