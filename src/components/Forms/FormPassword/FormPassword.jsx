import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const FormPassword = (uppassword) => {

    const navigate = useNavigate();
    const tokenUser = localStorage.getItem("token");
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    const [errors, setErrors] = useState({
        password: '',
        password_confirmation: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);

        try {
            const response = await axios.post(
                `https://offhouse.herokuapp.com/api/update-password`,
                formData, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )

            navigate('/profile');

        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        setPassword(uppassword.password)
        setPassword_confirmation(uppassword.password_confirmation)
    }, [])

    const handlePasswordBlur = (event) => {
        const password = event.target.value;
        let errorMessage = '';

        if(!/^(?=.*[a-z])/.test(password)) {
            errorMessage = 'La contraseña debe contener al menos una letra minúscula';
        } else if (!/^(?=.*[A-Z])/.test(password)) {
            errorMessage = 'La contraseña debe contener al menos una letra mayúscula';
        } else if (!/^(?=.*\d)/.test(password)) {
            errorMessage = 'La contraseña debe contener al menos un número';
        } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
            errorMessage = 'La contraseña debe contener al menos un carácter especial (!, @, #, $, %, ^, &, *)';
        } else if (password.length < 5 || password.length > 50) {
            errorMessage = 'La contraseña debe tener entre 5 y 50 caracteres';
        }

        if (errorMessage) {
            setErrors({ ...errors, password: true });
            setErrorMessages({ ...errorMessages, password: errorMessage });
        } else {
            setErrors({ ...errors, password: false });
            setErrorMessages({ ...errorMessages, password: '' });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
                        Actualizar Contraseña
                    </Typography>

                    <form onClick={handleSubmit}>
                        {error &&

                            <Alert severity="warning" sx={{ mb: '3%' }}>- Las contraseñas deben coincidir! <br /> - La contraseña debe tener almenos un número
                                <br /> - La contraseña debe tener almenos una letra mayúscula
                                <br /> - La contraseña debe tener almenos una letra minúscula
                                <br /> - La contraseña debe tener almenos un caracter especial
                                <br /> - La contraseña debe tener almenos 5 caracteres
                                <br /> - La contraseña no debe tener espacios en blanco

                            </Alert>
                        }


                        <Grid container spacing={3} >
                            <Grid item xs={12} >
                                <TextField
                                    id="role_id"
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                        if (event.target.value.length > 50) {
                                            setErrors({ ...errors, password: true });
                                            setErrorMessages({ ...errorMessages, password: 'No más de 25 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, password: true });
                                            setErrorMessages({ ...errorMessages, password: 'No menos de 5 caracteres' })
                                        } else {
                                            setErrors({ ...errors, password: false });
                                            setErrorMessages({ ...errorMessages, password: '' })
                                        }
                                    }}
                                    onBlur={handlePasswordBlur}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.password}
                                    helperText={errorMessages.password}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    name='password_confirmation'
                                    label="Confirmar Contraseña"
                                    type="password"
                                    value={password_confirmation}
                                    onChange={(event) => {
                                        setPassword_confirmation(event.target.value)
                                        if (event.target.value.length > 50) {
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'No más de 25 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'No menos de 5 caracteres' })
                                        } else if (event.target.value !== password) { // Condición para comparar si las contraseñas son iguales
                                            setErrors({ ...errors, password_confirmation: true });
                                            setErrorMessages({ ...errorMessages, password_confirmation: 'Las contraseñas no coinciden' });
                                        } else {
                                            setErrors({ ...errors, password_confirmation: false });
                                            setErrorMessages({ ...errorMessages, password_confirmation: '' })
                                        }
                                    }}
                                    onBlur={handlePasswordBlur}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.password_confirmation}
                                    helperText={errorMessages.password_confirmation}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                    onClick={handleSubmit}
                                >
                                    Confirmar
                                </Button>

                            </Grid>
                            <Grid item xs={6} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                    onClick={() => navigate('/profile')}
                                >
                                    Cancelar
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>

    )
}

export default FormPassword