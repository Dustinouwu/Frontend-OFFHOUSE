import { useState } from 'react';
import './CreateUser.css';
import Title from "../../components/atoms/Title/Title";
import Labeltwo from "../../components/atoms/Labeltwo/Labeltwo";
import Imagenes from "../../Imagenes";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Grid } from '@mui/material';

export const CreateUser = ({ register }) => {

    const navigate = useNavigate(); // Para navegar entre rutas
    const [error, setError] = useState(false);  // Para mostrar errores

    // Formulario
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

    // Manejador de cambios en el formulario
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // Manejador de envío del formulario
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
            } 
            console.log(response);
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
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

