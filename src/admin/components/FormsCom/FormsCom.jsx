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

const FormsComs = () => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [comments, setComments] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const showComment = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/admin/comments/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                setComments(response.data.data.comment);

            } catch (error) {
                console.log(error)
            }

        }
        showComment()
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Tarjeta Comentario
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
                                    label="ID del comentario"
                                    value={comments.id}
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
                                    label="Comentario"
                                    value={comments.comment}
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
                                    label="ID del usuario"
                                    value={comments.user_id}
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
                                    label="ID del producto"
                                    value={comments.product_id}
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
                                    label="Fecha de creación"
                                    value={comments.created_at}
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
                                    onClick={() => navigate('/crudcoms')}
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

export default FormsComs