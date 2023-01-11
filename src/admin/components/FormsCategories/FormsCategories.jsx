
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
import { useNavigate } from 'react-router-dom';






const theme = createTheme();

const FormsCategories = ({ categories }) => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: categories?.name ?? '',
        imagen: categories?.imagen ?? '',

    })
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    console.log(form)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes('')) {
            console.log('error');
            setError(true);
            return;
        }

        try {

            if (categories?.id) {
                await axios.put(
                    `https://offhouse.herokuapp.com/api/admin/categories/${categories.id}`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                );
            } else {
                await axios.post(
                    'https://offhouse.herokuapp.com/api/admin/categories',
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
            }
            console.log('Categoria creada')
            navigate('/crudcateg');
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Formulario Categorías
                    </Typography>
                    <Typography component="h4" variant="h7" align="center">
                        {categories?.id ? 'Actualizar Categoría' : 'Crear Categoría'}
                    </Typography>
                    <form onSubmit={handleSubmit}>


                        <Grid container spacing={3} >
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Nombre de la categoría"
                                    value={form.name}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="imagen"
                                    name="imagen"
                                    label="Ingrese la URL del producto"
                                    value={form.imagen}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                >
                                    CONFIRMAR
                                </Button>

                            </Grid>

                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default FormsCategories