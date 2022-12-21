import { useContext, useState } from 'react';
import './CreateUser.css';
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import Labeltwo from "../../components/Labeltwo/Labeltwo";
import Imagenes from "../../Imagenes";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../contexts';

export const CreateUser = ({ register }) => {

    /* VALIDACIONES */
    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    /* CONSTANTES */
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: register?.username ?? '',
        first_name: register?.first_name ?? '',
        last_name: register?.last_name ?? '',
        email: register?.email ?? '',
        home_phone: register?.home_phone ?? '',
        personal_phone: register?.personal_phone ?? '',
        address: register?.address ?? '',
        password: register?.password ?? '',
        password_confirmation: register?.password_confirmation ?? '',
    });

    const [error, setError] = useState(false);
    const [error2, setError2] = useState('')


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(
                'https://offhouse.herokuapp.com/api/register',
                { ...form }, { headers: { 'accept': 'application/json' } }
            )
            navigate('/home');

            if (response.status === 422) {
                setError('')
            } else {
                setError2('')
            }
            console.log(response);
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
        }
    }
    return (
        <div className="main-container">

            <div className="image-container">
                <img src={Imagenes.img1} alt='img'></img>
            </div>

            <div className="register-container">

                <form className="formregister" onSubmit={handleSubmit}>
                    <Title text='Register to OFFHOUSE'></Title>
                    {error &&
                        <label className="label-error-createu">
                            {error}
                        </label>
                    }
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <div style={{ paddingBottom: '4%', paddingLeft: '7%', paddingTop: '5%', gap: '50px' }}>
                            <Labeltwo
                                text='USUARIO'
                            />
                            <Labeltwo

                                text='NOMBRE'
                            />
                            <Labeltwo
                                text='APELLIDO'
                            />
                            <Labeltwo

                                text='EMAIL'
                            />
                            <Labeltwo
                                text='TELÉFONO'
                            />
                            <Labeltwo
                                text='CELULAR'
                            />
                            <Labeltwo
                                text='DIRECCIÓN'
                            />
                            <Labeltwo
                                text='CONTRASEÑA'
                            />
                            <Labeltwo
                                text='CONFIRMAR CONTRASEÑA'
                            />

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1%', position: 'absolute' }}>
                            <input
                                id="user"
                                type='text'
                                value={form.username}
                                className="inputcreateuser"
                                name='username'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="user"
                                type='text'
                                value={form.first_name}
                                className="inputcreateuser"
                                name='first_name'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="user"
                                type='text'
                                value={form.last_name}
                                className="inputcreateuser"
                                name='last_name'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="mail"
                                type='email'
                                value={form.email}
                                className="inputcreateuser"
                                name='email'
                                placeholder="example@example.com"
                                onChange={handleChange}
                            />
                            <input
                                id="telf"
                                type='tel'
                                value={form.home_phone}
                                className="inputcreateuser"
                                name='home_phone'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="telf"
                                type='tel'
                                value={form.personal_phone}
                                className="inputcreateuser"
                                name='personal_phone'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="dirre"
                                type='text'
                                value={form.address}
                                className="inputcreateuser"
                                name='address'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="password"
                                type='password'
                                value={form.password}
                                className="inputcreateuser"
                                name='password'
                                placeholder="example"
                                onChange={handleChange}
                            />
                            <input
                                id="password"
                                type='password'
                                value={form.password_confirmation}
                                className="inputcreateuser"
                                name='password_confirmation'
                                placeholder="example"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="submit-button-container">

                        <button >
                            CONFIRM
                        </button>

                    </div>
                </form>


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

