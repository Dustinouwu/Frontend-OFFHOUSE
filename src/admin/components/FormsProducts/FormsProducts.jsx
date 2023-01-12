import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

const FormsProducts = () => {

    const tokenUser = localStorage.getItem('token')
    const navigate = useNavigate();
    const [products, setProducts] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const showProduct = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/admin/products/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                setProducts(response.data.data.product);

            } catch (error) {
                console.log(error)
            }

        }
        showProduct()
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Tarjeta Producto
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
                                    label="ID del producto"
                                    value={products.id}
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
                                    label="Título del producto"
                                    value={products.title}
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
                                    label="Precio del producto"
                                    value={products.price}
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
                                    label="Stock del producto"
                                    value={products.stock}
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
                                    label="Estado del producto"
                                    value={products.state_appliance}
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
                                    label="Método de envío"
                                    value={products.delivery_method}
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
                                    label="Marca del producto"
                                    value={products.brand}
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
                                    label="Categorí"
                                    value={products.categorie_id}
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
                                    label="ID Producto"
                                    value={products.user_id}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            
                            <Typography component="h5" variant="h8" align="center" sx={{ mt: 3, ml: 3, color: 'rgba(0, 0, 0, 0.6)' }}>
                                Detalle del Producto
                            </Typography>
                            <Grid item xs={12} >
                                <TextareaAutosize
                                    maxRows={5}
                                    label="Stock del producto"
                                    aria-label="maximum height"
                                    placeholder="Maximum 4 rows"
                                    value={products.detail}
                                    style={{ width: '100%' }}
                                />
                            </Grid>
                            <Typography component="h5" variant="h8" align="center" sx={{ mt: 3, ml: 3, color: 'rgba(0, 0, 0, 0.6)' }}>
                                Imagen del producto
                            </Typography>
                            <Grid item xs={12} >
                                <img src={products.image} alt="imagen" style={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                    onClick={() => navigate('/crudproducts')}
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

export default FormsProducts