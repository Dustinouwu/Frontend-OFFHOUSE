import { useState } from 'react';
import './CreateUser.css';
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Imagenes from "../../Imagenes";
import { Link, useNavigate } from "react-router-dom";

export const CreateUser = () => {
    
    /* CONSTANTES */
    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    /* FUNCIONES */
    /* VALIDACIÓN CONTRASEÑA 6 DIGITOS */
    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value)
            
        } else {
            if (value.length < 6) {
                setPasswordError(true)
            } else {
                setPasswordError(false)
                setPassword(value)
                
            }

        }
    }

    /* VALIDACIÓN SI EL PARA PASAR EL USUARIO AL LOGIN */
    function ifMatch(param) {
        if (param.user.length > 0 && param.password.length > 0) {
            if (param.user === 'dastin' && param.password === '123456') {
                const { user, password } = param;
                let ac = { user, password }
                let account = JSON.stringify(ac);
                localStorage.setItem('account', account)
                
            } else {
  
            }
        } else {
         
        }
    }

    

    return (
        <div className="main-container">

            <div className="image-container">
                <img src={Imagenes.img1} alt='img'></img>
            </div>

            <div className="register-container">
                <Title text='Register to OFFHOUSE'></Title>
                <Label text='USERNAME'></Label>
                <Input
                    attribute={{
                        id: 'usuario',
                        name: 'usuario',
                        type: 'email',
                        placeholder: 'Ingrese un nombre de usuario'
                    }}
                    handleChange={handleChange}
                />
                <Label text='EMAIL'></Label>
                <Input
                    attribute={{
                        id: 'email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'das@example.com'
                    }}
                    handleChange={handleChange}
                />
                <Label text='PASSWORD'></Label>
                <Input
                    attribute={{
                        id: 'contraseña',
                        name: 'contraseña',
                        type: 'password',
                        placeholder: '***************'
                    }}
                    handleChange={handleChange}
                    param={passwordError}
                />
                {passwordError &&
                    <label className="label-error">
                        Contraseña inválida o incompleta
                    </label>
                }
                <Label text='CONFIRM PASSWORD'></Label>
                <Input
                    attribute={{
                        id: 'usuario',
                        name: 'usuario',
                        type: 'text',
                        placeholder: '***************'
                    }}
                    handleChange={handleChange}
                    
                />

                <div className="submit-button-container">
                    <button /* onClick={handleSubmit} */ onClick={() => navigate("/home")} >
                        CONFIRM
                    </button>
                </div>

                <div className="signup-container">
                    <Link to="/" ><h5 className="singupl">Do you already have an account?</h5></Link>
                </div>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='props'></img>
            </div>


        </div>
    )
}

