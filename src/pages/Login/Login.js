import React, { useContext, useState } from "react";
import './Login.css';
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Imagenes from '../../Imagenes';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import axios from "axios";



export const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        } catch (error) {
            console.log(error.response.data.message, 'error');
            
        }
    }







    return (
        <div className="main-container">

            <div className="image-container">
                <img src={Imagenes.img1} alt='Imagen Electrodomésticos'></img>
            </div>

            <div className="login-container">
                <form className="formlogin"  onSubmit={onLogin}>
                    <Title text='Login to OFFHOUSE'></Title>


                    <input
                        id="email"
                        type='mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}>

                    </input>
                    <Label
                        text='USERNAME'
                    />

                    <input
                        id="contraseña"
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}>

                    </input>
                    <Label
                        text='PASSWORD'
                    />




                    <div className="submit-button-container">

                        <button>
                            
                            LOGIN
                        </button>


                    </div>
                    
                    <button  >
                            <Link to="admin/*" >ADMIN ACCOUNT</Link>
                            
                        </button>
                    

                    <h5>Create your account</h5>

                    <div className="signup-container">
                        <h5>Not a member? </h5>
                        <Link to="/register" ><h5 className="singupl">Sign up</h5></Link>
                    </div>

                    <div className="signup-container">
                        <Link to="/resetpssw" ><h5 className="singupl">Don’t remember your password?</h5></Link>
                    </div>
                </form>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>


        </div >
    )

}

