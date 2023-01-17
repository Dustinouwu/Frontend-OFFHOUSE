import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
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
    const [form, setForm] = useState({
        password: uppassword?.password ?? '',
        password_confirmation: uppassword?.password_confirmation ?? '',

    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes('')) {
            console.log('error');
            setError(true);
            return;
        }

        try {
            const response = await axios.post(
                `https://offhouse.herokuapp.com/api/update-password`,
                { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )

            navigate('/profile');
            if (response.status === 422) {
                setError('')
            }
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Actualizar Contraseña
                    </Typography>

                    <form onClick={handleSubmit}>
                        {error &&
                            <label className="label-error-createu">
                                {error}
                            </label>
                        }

                        <Grid container spacing={3} >
                            <Grid item xs={12} >
                                <TextField
                                    id="role_id"
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    name='password_confirmation'
                                    label="Confirmar Contraseña"
                                    type="password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

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