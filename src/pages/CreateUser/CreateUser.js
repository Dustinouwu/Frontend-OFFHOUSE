import { useState } from 'react';
import './CreateUser.css';
import Title from "../../components/atoms/Title/Title";
import Labeltwo from "../../components/atoms/Labeltwo/Labeltwo";
import Label from '../../components/atoms/Label/Label';
import Imagenes from "../../Imagenes";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Grid, Alert, Button, Container, Paper, CssBaseline, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const CreateUser = ({ register }) => {

    const navigate = useNavigate(); // Para navegar entre rutas
    const [error, setError] = useState(false);  // Para mostrar errores
    const [username, setUsername] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [home_phone, setHome_phone] = useState('');
    const [personal_phone, setPersonal_phone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const [errors, setErrors] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        home_phone: '',
        personal_phone: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        username: '- El nombre de usuario es obligatorio',
        first_name: '- El nombre es obligatorio',
        last_name: '- El apellido es obligatorio',
        email: '- El correo es obligatorio y necesita ser válido',
        home_phone: '- El teléfono no es obligatorio',
        personal_phone: '- El celular es obligatorio y necesita 10 digitos',
        address: '- La dirección es obligatoria',
        password: '- La contraseña necesita mínimo: una mayúsucla, una minúscula, un carácter especial y un número',
        password_confirmation: '',
    });
   
    
    

    //Sacar todo el arreglo de errores y mostrarlos en un solo string con un salto de línea entre cada uno 
    const handleErrors = Object.values(errorMessages).map((error) => {
        return (
            <div>
                {error}
            </div>
        )
    })

    

    // Manejador de envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('home_phone', home_phone);
        formData.append('personal_phone', personal_phone);
        formData.append('address', address);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);

        try {
            const response = await axios.post(
                'https://offhouse.herokuapp.com/api/register',
                formData, { headers: { 'accept': 'application/json' } }
            )
            navigate('/home');


            console.log(response);
        } catch (error) {
            setError(error.response.data.errors)
            console.log(error);
        }
    }


    return (
        <div style={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
            
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container component="main" maxWidth="sm" sx={{ mb: 0, mt: 10 }}>

                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 0 }}>
                        CREA TU PERFIL
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {error &&

                            <Alert severity="error" sx={{ mb: '0%' }}>{handleErrors}</Alert>
                        }

                        <Grid container spacing={3} >
                            <Grid item xs={12} >
                                <TextField
                                    id="role_id"
                                    name="username"
                                    label="Nombre de usuario"
                                    placeholder="Pepito22"
                                    value={username}
                                    onChange={(event) => {
                                        setUsername(event.target.value)
                                        if (event.target.value.length > 50) {
                                            setErrors({ ...errors, username: true });
                                            setErrorMessages({ ...errorMessages, username: 'No más de 25 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, username: true });
                                            setErrorMessages({ ...errorMessages, username: 'No menos de 5 caracteres' })
                                        } else {
                                            setErrors({ ...errors, username: false });
                                            setErrorMessages({ ...errorMessages, username: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, username: true });
                                            setErrorMessages({ ...errorMessages, username: 'Este campo es obligatorio' });
                                        }
                                    }}

                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.username}
                                    helperText={errorMessages.username}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name='first_name'
                                    label="Nombre"
                                    placeholder="Miguel"
                                    value={first_name}
                                    onChange={(event) => {
                                        setFirst_name(event.target.value)
                                        if (event.target.value.length > 25) {
                                            setErrors({ ...errors, first_name: true });
                                            setErrorMessages({ ...errorMessages, first_name: 'No más de 25 caracteres' })
                                        } else if (event.target.value.length < 3) {
                                            setErrors({ ...errors, first_name: true });
                                            setErrorMessages({ ...errorMessages, first_name: 'No menos de 3 caracteres' })
                                        } else {
                                            setErrors({ ...errors, first_name: false });
                                            setErrorMessages({ ...errorMessages, first_name: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, first_name: true });
                                            setErrorMessages({ ...errorMessages, first_name: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.first_name}
                                    helperText={errorMessages.first_name}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="last_name"
                                    label="Apellido"
                                    placeholder="Perez"
                                    value={last_name}
                                    onChange={(event) => {
                                        setLast_name(event.target.value)
                                        if (event.target.value.length > 25) {
                                            setErrors({ ...errors, last_name: true });
                                            setErrorMessages({ ...errorMessages, last_name: 'No más de 25 caracteres' })
                                        } else if (event.target.value.length < 3) {
                                            setErrors({ ...errors, last_name: true });
                                            setErrorMessages({ ...errorMessages, last_name: 'No menos de 3 caracteres' })
                                        } else {
                                            setErrors({ ...errors, last_name: false });
                                            setErrorMessages({ ...errorMessages, last_name: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, last_name: true });
                                            setErrorMessages({ ...errorMessages, last_name: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.last_name}
                                    helperText={errorMessages.last_name}

                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    name="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    label="Email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                        if (event.target.value.length > 30) {
                                            setErrors({ ...errors, email: true });
                                            setErrorMessages({ ...errorMessages, email: 'No más de 30 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, email: true });
                                            setErrorMessages({ ...errorMessages, email: 'No menos de 5 caracteres' })
                                        } else {
                                            setErrors({ ...errors, email: false });
                                            setErrorMessages({ ...errorMessages, email: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, email: true });
                                            setErrorMessages({ ...errorMessages, email: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.email}
                                    helperText={errorMessages.email}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    label="Teléfono"
                                    name='home_phone'
                                    placeholder="2476391"
                                    type='number'
                                    fullWidth
                                    onChange={(event) => {
                                        setHome_phone(event.target.value)
                                        if (event.target.value.length > 7) {
                                            setErrors({ ...errors, home_phone: true });
                                            setErrorMessages({ ...errorMessages, home_phone: 'No más de 7 caracteres' })
                                        }  else {
                                            setErrors({ ...errors, home_phone: false });
                                            setErrorMessages({ ...errorMessages, home_phone: '' })
                                        }
                                    }}
                                    value={home_phone}
                                    autoComplete="shipping address-line2"
                                    required
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.home_phone}
                                    helperText={errorMessages.home_phone}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    label="Celular"
                                    name='personal_phone'
                                    type='number'
                                    placeholder="0987335353"
                                    fullWidth
                                    onChange={(event) => {
                                        setPersonal_phone(event.target.value)
                                        if (event.target.value.length > 10) {
                                            setErrors({ ...errors, personal_phone: true });
                                            setErrorMessages({ ...errorMessages, personal_phone: 'No más de 10 caracteres' })
                                        } else if (event.target.value.length < 10) {
                                            setErrors({ ...errors, personal_phone: true });
                                            setErrorMessages({ ...errorMessages, personal_phone: 'No menos de 10 caracteres' })
                                        } else {
                                            setErrors({ ...errors, personal_phone: false });
                                            setErrorMessages({ ...errorMessages, personal_phone: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, personal_phone: true });
                                            setErrorMessages({ ...errorMessages, personal_phone: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    value={personal_phone}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.personal_phone}
                                    helperText={errorMessages.personal_phone}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    label="Dirección"
                                    name='address'
                                    placeholder="Av. 12 de Octubre y Av. 6 de Diciembre"
                                    fullWidth
                                    value={address}
                                    onChange={(event) => {
                                        setAddress(event.target.value)
                                        if (event.target.value.length > 50) {
                                            setErrors({ ...errors, address: true });
                                            setErrorMessages({ ...errorMessages, address: 'No más de 50 caracteres' })
                                        } else if (event.target.value.length < 3) {
                                            setErrors({ ...errors, address: true });
                                            setErrorMessages({ ...errorMessages, address: 'No menos de 3 caracteres' })
                                        } else {
                                            setErrors({ ...errors, address: false });
                                            setErrorMessages({ ...errorMessages, address: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, address: true });
                                            setErrorMessages({ ...errorMessages, address: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.address}
                                    helperText={errorMessages.address}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    label="Contraseña"
                                    name='password'
                                    type='password'
                                    placeholder="********"
                                    fullWidth
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                        if (event.target.value.length > 15) {
                                            setErrors({ ...errors, password: true });
                                            setErrorMessages({ ...errorMessages, password: 'No más de 15 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, password: true });
                                            setErrorMessages({ ...errorMessages, password: 'Tu clave necesita almenos: 5 carácteres, una mayúscula, una minúscula, un número y un simbolo' })
                                        } else {
                                            setErrors({ ...errors, password: false });
                                            setErrorMessages({ ...errorMessages, password: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, password: true });
                                            setErrorMessages({ ...errorMessages, password: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.password}
                                    helperText={errorMessages.password}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    label="Confirmar Contraseña"
                                    name='password_confirmation'
                                    placeholder="********"
                                    type='password'
                                    fullWidth
                                    value={password_confirmation}
                                    onChange={(event) => {
                                        setPasswordConfirmation(event.target.value)
                                        if (event.target.value.length > 15) {
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'No más de 15 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'Tu clave necesita almenos: 5 carácteres, una mayúscula, una minúscula, un número y un simbolo' })
                                        } else if (event.target.value !== password) { // Condición para comparar si las contraseñas son iguales
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'Las contraseñas no coinciden' });
                                        } else {
                                            setErrors({ ...errors, password_confirmation: false });
                                            setErrorMessages({ ...errorMessages, password_confirmation: '' });
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.password_confirmation}
                                    helperText={errorMessages.password_confirmation}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} >
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: '1%', backgroundColor: '#FF9901', alignItems: 'center', '&:hover': { backgroundColor: '#FF9901', }
                                    }}
                                    onClick={(event) => {
                                        handleSubmit(event);
                                    }}
                                >
                                    Confirmar
                                </Button>

                            </Grid>
                            <Grid item xs={6} >
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: '1%', backgroundColor: '#FF9901', alignItems: 'center', '&:hover': { backgroundColor: '#FF9901', }
                                    }}
                                    onClick={() => navigate('/login')}
                                >
                                    Cancelar
                                </Button>

                            </Grid>
                        </Grid>
                    </form>

                </Container>
            </ThemeProvider>
            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>
        </div>
    )
}

{/* <div className="main-container">

<Grid container component="main" sx={{ height: '100vh' }}>
    <Grid
        item
        xs={false}
        sm={false}
        md={5}
        sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1632923565835-6582b54f2105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',

        }}
    />
</Grid>

<Title text='Registro de usuario'></Title>
<div className="login-container">

    <div className="formcreate" style={{ overflow: 'scroll', overflowX: 'hidden',  height: '75%', width:'28%', position: 'absolute', marginRight: '14%' }}>
        <form onSubmit={handleSubmit} >

            {error &&

                <Alert severity="error" sx={{ mb: '3%' }}>{error}</Alert>
            }

            <Label
                text='USUARIO'
            />

            <input
                id="user"
                type='text'
                name='username'
                onChange={handleChange}
                value={form.username}
                className="inputstyle"
                placeholder="Pepito"
            >
            </input>

            <Label
                text='NOMBRE'
            />

            <input
                id="user"
                type='text'
                name='first_name'
                onChange={handleChange}
                value={form.first_name}
                className="inputstyle"
                placeholder="Miguel"
            >
            </input>

            <Label
                text='APELLIDO'
            />

            <input
                id="user"
                type='text'
                name='last_name'
                onChange={handleChange}
                value={form.last_name}
                className="inputstyle"
                placeholder="Tenorio"
            >
            </input>

            <Label
                text='EMAIL'
            />

            <input
                id="mail"
                type='email'
                name='email'
                value={form.email}
                className="inputstyle"
                placeholder="example@example.com"
                onChange={handleChange}
            >
            </input>
            <Label
                text='TELÉFONO'
            />

            <input
                id="telf"
                type='tel'
                name='home_phone'
                value={form.home_phone}
                className="inputstyle"
                placeholder="2476391"
                onChange={handleChange}
            >
            </input>
            <Label
                text='CELULAR'
            />

            <input
                id="telf"
                type='tel'
                name='personal_phone'
                value={form.personal_phone}
                className="inputstyle"
                placeholder="0987335353"
                onChange={handleChange}
            >
            </input>

            <Label
                text='DIRECCIÓN'
            />

            <input
                id="dirre"
                type='text'
                value={form.address}
                className="inputstyle"
                name='address'
                placeholder="Quito - Quitumbe"
                onChange={handleChange}
            >
            </input>

            <Label
                text='CONTRASEÑA'
            />

            <input
                id="password"
                type='password'
                value={form.password}
                className="inputstyle"
                name='password'
                placeholder="***************"
                onChange={handleChange}
            >
            </input>

            <Label
                text='CONFIRMAR CONTRASEÑA'
            />

            <input
                id="password"
                type='password'
                value={form.password_confirmation}
                className="inputstyle"
                name='password_confirmation'
                placeholder="***************"
                onChange={handleChange}
            >
            </input>
        </form>

    </div>
    <div className="submit-button-container" style={{ position: 'fixed', bottom:'0', display: 'flex', flexDirection: 'column', marginRight: '15%' }} onClick={handleSubmit}>
        <Link to="/" ><h5 className="singupl" style={{paddingTop: '15%'}}>Ya tienes una cuenta?</h5></Link>
        <button  >
            INGRESAR
        </button>
    </div>
    <div className="signup-container" style={{ position: 'fixed', bottom: '2' }}>

    </div>

</div>

<div className="logo-container">
    <img src={Imagenes.img4} alt='props'></img>
</div>
</div> */}
{/* <form className="formregister" onSubmit={handleSubmit}>
                    <Title text='Registro para OFFHUSE'></Title>
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
                                placeholder="Pepito"
                                onChange={handleChange}
                            />
                            <input
                                id="user"
                                type='text'
                                value={form.first_name}
                                className="inputcreateuser"
                                name='first_name'
                                placeholder="Raúl"
                                onChange={handleChange}
                            />
                            <input
                                id="user"
                                type='text'
                                value={form.last_name}
                                className="inputcreateuser"
                                name='last_name'
                                placeholder="Muzo"
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
                                placeholder="2476391"
                                onChange={handleChange}
                            />
                            <input
                                id="telf"
                                type='tel'
                                value={form.personal_phone}
                                className="inputcreateuser"
                                name='personal_phone'
                                placeholder="0987335353"
                                onChange={handleChange}
                            />
                            <input
                                id="dirre"
                                type='text'
                                value={form.address}
                                className="inputcreateuser"
                                name='address'
                                placeholder="Quito - Quitumbe"
                                onChange={handleChange}
                            />
                            <input
                                id="password"
                                type='password'
                                value={form.password}
                                className="inputcreateuser"
                                name='password'
                                placeholder="***************"
                                onChange={handleChange}
                            />
                            <input
                                id="password"
                                type='password'
                                value={form.password_confirmation}
                                className="inputcreateuser"
                                name='password_confirmation'
                                placeholder="***************"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="submit-button-container">

                        <button >
                            CONFIRMAR
                        </button>

                    </div>
                </form> */}