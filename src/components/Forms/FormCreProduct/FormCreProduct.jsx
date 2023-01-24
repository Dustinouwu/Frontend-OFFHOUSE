import React, { useEffect, useState } from 'react'
import './FormCreProduct.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, makeStyles, MenuItem, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Snackbar from '@mui/material/Snackbar'
import Footer from '../../Layouts/Footer/Footer';


const theme = createTheme();

const FormCreProduct = ({ products }) => {
    const tokenUser = localStorage.getItem('token')
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    const [stock, setStock] = useState('');
    const [state_appliance, setStateAppliance] = useState('');
    const [brand, setBrand] = useState('');
    const [delivery_method, setdeliveryMethod] = useState('');
    const [categorie_id, setcategorieId] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({
        title: false,
        price: false,
        detail: false,
        stock: false,
        state_appliance: false,
        brand: false,
        delivery_method: false,
        categorie_id: false,
        phone: false,
        address: false,
        image: false,
    })

    const [errorMessages, setErrorMessages] = useState({
        title: '',
        price: '',
        detail: '',
        stock: '',
        state_appliance: '',
        brand: '',
        delivery_method: '',
        categorie_id: '',
        phone: '',
        address: '',
        image: '',
    })


    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('detail', detail);
        formData.append('stock', stock);
        formData.append('state_appliance', state_appliance);
        formData.append('brand', brand);
        formData.append('delivery_method', delivery_method);
        formData.append('categorie_id', categorie_id);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('image', image);
        console.log(formData);

        try {
            await axios.post(
                'https://offhouse.herokuapp.com/api/products',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': tokenUser
                    },
                }
            )
            navigate('/productlist');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message)
        }
    }




    const handleImageChange = (event) => {
        setImage(event.target.files[0]);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };



    useEffect(() => {
        handleSubmit();
    }, [handleSubmit])




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Crear tu producto
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {error &&

                            <Alert severity="error" sx={{ mb: '3%' }}>Llene todos los campos!</Alert>
                        }
                        <Grid container spacing={3} >
                            <Grid item xs={12} >
                                <TextField
                                    id="role_id"
                                    name="role_id"
                                    label="Nombre del producto"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                        if (event.target.value.length > 50) {
                                            setErrors({ ...errors, title: true });
                                            setErrorMessages({ ...errorMessages, title: 'No más de 50 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, title: true });
                                            setErrorMessages({ ...errorMessages, title: 'No menos de 5 caracteres' })
                                        } else {
                                            setErrors({ ...errors, title: false });
                                            setErrorMessages({ ...errorMessages, title: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, title: true });
                                            setErrorMessages({ ...errorMessages, title: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={errors.title}
                                    helperText={errorMessages.title}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="Usuario"
                                    label="Marca"
                                    onChange={(event) => {
                                        setBrand(event.target.value)
                                        if (event.target.value.length > 20) {
                                            setErrors({ ...errors, brand: true });
                                            setErrorMessages({ ...errorMessages, brand: 'No más de 20 caracteres' })
                                        } else if (event.target.value.length < 1) {
                                            setErrors({ ...errors, brand: true });
                                            setErrorMessages({ ...errorMessages, brand: 'No menos de 1 caracter' })
                                        } else {
                                            setErrors({ ...errors, brand: false });
                                            setErrorMessages({ ...errorMessages, brand: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, brand: true });
                                            setErrorMessages({ ...errorMessages, brand: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={errors.brand}
                                    helperText={errorMessages.brand}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="Usuario"
                                    type="number"
                                    label="Precio del producto"
                                    onChange={(event) => {
                                        setPrice(event.target.value)
                                        if (event.target.value.length > 5) {
                                            setErrors({ ...errors, price: true });
                                            setErrorMessages({ ...errorMessages, price: 'No más de 5 caracteres' })
                                        } else if (event.target.value.length < 1) {
                                            setErrors({ ...errors, price: true });
                                            setErrorMessages({ ...errorMessages, price: 'No menos de 1 caracteres' })
                                        } else {
                                            setErrors({ ...errors, price: false });
                                            setErrorMessages({ ...errorMessages, price: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, price: true });
                                            setErrorMessages({ ...errorMessages, price: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={errors.price}
                                    helperText={errorMessages.price}


                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="last_name"
                                    type="number"
                                    label="Stock del producto"
                                    onChange={(event) => {
                                        setStock(event.target.value)
                                        if (event.target.value.length > 5) {
                                            setErrors({ ...errors, stock: true });
                                            setErrorMessages({ ...errorMessages, stock: 'No más de 5 caracteres' })
                                        } else if (event.target.value.length < 1) {
                                            setErrors({ ...errors, stock: true });
                                            setErrorMessages({ ...errorMessages, stock: 'No menos de 1 caracteres' })
                                        } else {
                                            setErrors({ ...errors, stock: false });
                                            setErrorMessages({ ...errorMessages, stock: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, stock: true });
                                            setErrorMessages({ ...errorMessages, stock: 'Este campo es obligatorio' });
                                        }
                                    }}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={errors.stock}
                                    helperText={errorMessages.stock}

                                />
                            </Grid>


                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="last_name"
                                    label="Estado del producto"
                                    select
                                    fullWidth


                                    onChange={(event) => {
                                        setStateAppliance(event.target.value)
                                    }}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                >
                                    <MenuItem value="Nuevo" selected>Nuevo</MenuItem>
                                    <MenuItem value="Usado">Usado</MenuItem>
                                    <MenuItem value="Reacondicionado">Reacondicionado</MenuItem>
                                    <MenuItem value="Reparado">Reparado</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name='delivery_method'
                                    label="Método de entrega"
                                    select

                                    fullWidth
                                    onChange={(event) => setdeliveryMethod(event.target.value)}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    <MenuItem value="Envio gratis" selected>Envio gratis</MenuItem>
                                    <MenuItem value="Acuerdo Mutuo">Acuerdo Mutuo</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    label="Teléfono"
                                    name='phone'
                                    type='number'
                                    fullWidth
                                    onChange={(event) => {
                                        setPhone(event.target.value)
                                        if (event.target.value.length > 10) {
                                            setErrors({ ...errors, phone: true });
                                            setErrorMessages({ ...errorMessages, phone: 'No más de 10 caracteres' })
                                        } else if (event.target.value.length < 7) {
                                            setErrors({ ...errors, phone: true });
                                            setErrorMessages({ ...errorMessages, phone: 'No menos de 7 caracteres' })
                                        } else {
                                            setErrors({ ...errors, phone: false });
                                            setErrorMessages({ ...errorMessages, phone: '' })
                                        }
                                    }}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setErrors({ ...errors, phone: true });
                                            setErrorMessages({ ...errorMessages, phone: 'Este campo es obligatorio' });
                                        }
                                    }}

                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={errors.phone}
                                    helperText={errorMessages.phone}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    label="Categoria"
                                    name='categorie_id'
                                    select

                                    fullWidth
                                    onChange={(event) => setcategorieId(event.target.value)}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    error={errors.categorie_id}
                                    helperText={errorMessages.categorie_id}
                                >
                                    <MenuItem value="1" selected>Refrigeradores</MenuItem>
                                    <MenuItem value="2">Cocina</MenuItem>
                                    <MenuItem value="3">Microondas</MenuItem>
                                    <MenuItem value="4">Iron</MenuItem>
                                    <MenuItem value="5">Lavadora</MenuItem>
                                    <MenuItem value="6">Televisión</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    id="username"
                                    label="Dirección"
                                    name='address'
                                    fullWidth
                                    onChange={(event) => {
                                        setAddress(event.target.value)
                                        if (event.target.value.length > 50) {
                                            setErrors({ ...errors, address: true });
                                            setErrorMessages({ ...errorMessages, address: 'No más de 50 caracteres' })
                                        } else if (event.target.value.length < 5) {
                                            setErrors({ ...errors, address: true });
                                            setErrorMessages({ ...errorMessages, address: 'No menos de 5 caracteres' })
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
                                    required
                                    error={errors.address}
                                    helperText={errorMessages.address}
                                >
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h5" variant="h8" align="left" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                    Subir una imagen
                                </Typography>
                                {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '40%' }} />}
                                <Button variant="contained" component="label" sx={{ width: '40%', marginTop: '2%' }}>
                                    <PhotoLibraryIcon />
                                    Subir imagen
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        id="image" name='image'
                                        onChange={(event) => {
                                            setImage(event.target.files[0]);
                                            handleImageChange(event);
                                        }}

                                    />

                                </Button>

                            </Grid>


                            <Grid item xs={12} >
                                <Typography component="h5" variant="h8" align="left" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                    Detalle del Producto
                                </Typography>
                                <TextareaAutosize
                                    maxRows={5}
                                    label="Stock del producto"
                                    aria-label="maximum height"
                                    multiline

                                    height='100%'
                                    onChange={(event) => setDetail(event.target.value)}
                                    style={{ width: '100%', height: '80px' }}

                                />
                            </Grid>

                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                    onClick={(event) => {
                                        handleSubmit(event);
                                    }}
                                >
                                    Confirmar
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}
export default FormCreProduct

