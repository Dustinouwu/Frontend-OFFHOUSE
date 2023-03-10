import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

const FormsUsers = () => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [users, setUsers] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const shoUsers = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/admin/customers/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                setUsers(response.data.data.customer);

            } catch (error) {
                console.log(error)
            }

        }
        shoUsers()
    }, [])

    const newDate = (date) => {
        const newDate = date.split('T')
        return newDate[0]
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Tarjeta Usuario
                    </Typography>

                    <form>
                        {error &&
                            <label className="label-error-createu">
                                {error}
                            </label>
                        }

                        <Grid container spacing={3} >
                            <Grid item xs={12}>
                                <TextField
                                    id="id"
                                    name="id"
                                    label="ID del usuario"
                                    value={users.id}
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
                                    id="role_id"
                                    name="role_id"
                                    label="Rol de usuario"
                                    value={users.role_id}
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
                                    name="Usuario"
                                    label="Nombre de Usuario"
                                    value={users.username}
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
                                    name="first_name"
                                    label="Nombre"
                                    value={users.first_name}
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
                                    name="last_name"
                                    label="Apellido"
                                    value={users.last_name}
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
                                    id="personal_phone"
                                    name="personal_phone"
                                    label="Celular"
                                    value={users.personal_phone}
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
                                    id="home_phone"
                                    name="home_phone"
                                    label="Tel??fono"
                                    value={users.home_phone}
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
                                    id="rollo"
                                    name="mail"
                                    label="Email"
                                    value={users.email}
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
                                    id="rollo"
                                    name="email_verified_at"
                                    label="Fecha de verificaci??n de email"
                                    value={users.email_verified_at}
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
                                    id="rollo"
                                    name="created_at"
                                    label="Fecha de creaci??n de usuario"
                                    value={users.created_at}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                    onClick={() => navigate('/crudusers')}
                                >
                                    Regresar
                                </Button>

                            </Grid>

                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default FormsUsers