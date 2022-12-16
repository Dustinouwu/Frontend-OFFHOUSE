import React, { useState } from "react";
import './ResetPassword.css';
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Imagenes from '../../Imagenes';
import { Link } from "react-router-dom";



const Login = () => {

    /* CONSTANTES */
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [hasError, setHasError] = useState(false)

    /* FUNCIONES */
    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value)
            setHasError(false)
        } else {
            if (value.length < 6) {
                setPasswordError(true)
                setHasError(false)
            } else {
                setPasswordError(false)
                setPassword(value)
                setHasError(false)
            }
        }
    }

    /* VALIDACIÓN DE NÚMERO CARÁCTERES */
    function ifMatch(param) {
        if (param.user.length > 0 && param.password.length > 0) {
            if (param.user === 'dastin' && param.password === '123456') {
                const { user, password } = param;
                let ac = { user, password }
                let account = JSON.stringify(ac);
                localStorage.setItem('account', account)

            } else {

                setHasError(true)
            }
        }
    }

    /*  OBTENCION DE DATOS */
    function handleSubmit() {
        let data = { user, password }
        if (data) {
            ifMatch(data)
            console.log(data)
        }
    }


    return (
        /* CONTAINER MAIN LOGIN  */
        <div className="main-container">

            <div className="image-container">
                <img src={Imagenes.img1} alt='Imagen Electrodomésticos'></img>
            </div>

            <div className="login-container">
                <Title text='RESET PASSWORD'></Title>

                {hasError &&
                    <label className="label-error-login">
                        Su contraseña o usuario son incorrectos!
                    </label>
                }

                <Label
                    text='EMAIL'
                />

                <Input
                    attribute={{
                        id: 'email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'das@example.com'
                    }}
                    handleChange={handleChange}
                />



    
                <div className="submit-button-container">
                    <Link to="/home">
                        <button onClick={handleSubmit} >
                            CONFIRM
                        </button>
                    </Link>

                </div>


                <div className="signup-container">
                    <h5>Not a member? </h5>
                    <Link to="/register" ><h5 className="singupl">Sign up</h5></Link>
                </div>

                <div className="signup-container">
                    <Link to="/" ><h5 className="singupl">Do you already have an account?</h5></Link>
                </div>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>


        </div >
    )

}

export default Login;   