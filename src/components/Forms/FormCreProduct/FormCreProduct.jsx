import React, { useEffect, useState } from 'react'
import './FormCreProduct.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, MenuItem } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
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
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false); // Constante para mostrar errores



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


        } catch (error) {
            console.error(error);
        }
    }


    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };




    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Crear tu producto
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {error &&
                            <label className="label-error-createu">
                                {error}
                            </label>
                        }

                        <Grid container spacing={3} >
                            <Grid item xs={6} >
                                <TextField
                                    id="role_id"
                                    name="role_id"
                                    label="Nombre del producto"
                                    onChange={(event) => setTitle(event.target.value)}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="Usuario"
                                    label="Marca"
                                    onChange={(event) => setBrand(event.target.value)}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="Usuario"
                                    type="number"
                                    label="Precio del producto"
                                    onChange={(event) => setPrice(event.target.value)}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="last_name"
                                    type="number"
                                    label="Stock del producto"
                                    onChange={(event) => setStock(event.target.value)}
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>


                            <Grid item xs={6} >
                                <TextField
                                    id="username"
                                    name="last_name"
                                    label="Estado del producto"
                                    select
                                    fullWidth
                                    onChange={(event) => setStateAppliance(event.target.value)}
                                    autoComplete="shipping address-line2"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                >
                                    <MenuItem value="1" selected>Refrigeradores</MenuItem>
                                    <MenuItem value="2">Cocina</MenuItem>
                                    <MenuItem value="3">Microondas</MenuItem>
                                    <MenuItem value="4">Iron</MenuItem>
                                    <MenuItem value="5">Lavadora</MenuItem>
                                    <MenuItem value="6">Televisión</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography component="h5" variant="h8" align="left" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                    Subir una imagen
                                </Typography>
                                {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '40%' }} />}
                                <Button variant="contained" component="label" sx={{width: '40%', marginTop: '2%' }}>
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
                                        }} />

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

                                    placeholder="Coloca el detalle del producto"
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
                                        navigate("/productlist");
                                    }}
                                >
                                    Confirmar
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    )






}

export default FormCreProduct

{/* <div style={{ marginLeft: '3%', marginRight: '3%' }} >
            <div className='formproduct' >
                <h1 id='labelhelp'>
                    {products?.id ? 'Editar Producto' : 'Crear un Producto'}
                </h1>
                <form className='formproduct' onSubmit={handleSubmit} >
                    {error &&
                        <label className="label-error-createu">
                            {error}
                        </label>
                    }
                    <Box sx={{
                        '& .MuiTextField-root': { ml: 4, width: '40ch' },
                    }} >
                        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 3, md: 1 }}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    name='title'
                                    
                                    label="Nombre Producto"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setTitle(event.target.value)}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    name='brand'
                                    
                                    label="Marca"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setBrand(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    name='stock'
                                    
                                    label="Stock"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setStock(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Estado del producto"
                                    name='state_appliance'
                                    
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setStateAppliance(event.target.value)}
                                >
                                    <MenuItem value="Nuevo" selected>Nuevo</MenuItem>
                                    <MenuItem value="Usado">Usado</MenuItem>
                                    <MenuItem value="Reacondicionado">Reacondicionado</MenuItem>
                                    <MenuItem value="Reparado">Reparado</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Precio"
                                    name='price'
                                    
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setPrice(event.target.value)}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Método de entrega"
                                    name='delivery_method'
                                 
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setdeliveryMethod(event.target.value)}
                                >
                                    <MenuItem value="Envio gratis" selected>Envio gratis</MenuItem>
                                    <MenuItem value="Acuerdo Mutuo">Acuerdo Mutuo</MenuItem>
                                </TextField>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Categoria"
                                    name='categorie_id'
                                    
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => setcategorieId(event.target.value)}

                                >
                                    <MenuItem value="1" selected>Refrigeradores</MenuItem>
                                    <MenuItem value="2">Cocina</MenuItem>
                                    <MenuItem value="3">Microondas</MenuItem>
                                    <MenuItem value="4">Iron</MenuItem>
                                    <MenuItem value="5">Lavadora</MenuItem>
                                    <MenuItem value="6">Televisión</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden type="file" accept="image/*" id="image" name='image' onChange={(event) => setImage(event.target.files[0])} />
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Descripción"
                                    name='detail'
                                   
                                    multiline
                                    onChange={(event) => setDetail(event.target.value)}
                                    rows={6}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className="submit-button-container" style={{ paddingBottom: '5rem' }}>

                        <button >
                            CONFIRM
                        </button>

                    </div>
                </form>

            </div>


        </div> */}
/* const navigate = useNavigate(); // Función para navegar
    const tokenUser = localStorage.getItem('token') // Función para traer el token del usuario
    const [error, setError] = useState(false); // Constante para mostrar errores

    //Formulario
    const [form, setForm] = useState({
        title: products?.title ?? '',
        price: products?.price ?? '',
        detail: products?.detail ?? '',
        stock: products?.stock ?? '',
        state_appliance: products?.state_appliance ?? '',
        brand: products?.brand ?? '',
        delivery_method: products?.delivery_method ?? '',
        categorie_id: products?.categorie_id ?? '',
        image: products?.image ?? '',
    });
    // Función para manejar el formulario
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    
    // Función para manejar el submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(products)
            if (products?.id) {
                await axios.post(
                    `https://offhouse.herokuapp.com/api/products/${products.id}`,
                    { ...form }, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': tokenUser } }
                );
            } else {
                await axios.post(
                    `https://offhouse.herokuapp.com/api/products`,
                    { ...form }, { headers: { 'Content-Type': 'multipart/form-data', 'authorization': tokenUser } }
                );
            }
            navigate('/productlist')
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <div style={{ marginLeft: '3%', marginRight: '3%' }} >
            <div className='formproduct' >
                <h1 id='labelhelp'>
                    {products?.id ? 'Editar Producto' : 'Crear un Producto'}
                </h1>
                <form className='formproduct' onSubmit={handleSubmit} >
                    {error &&
                        <label className="label-error-createu">
                            {error}
                        </label>
                    }
                    <Box sx={{
                        '& .MuiTextField-root': { ml: 4, width: '40ch' },
                    }} >
                        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 3, md: 1 }}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    name='title'
                                    value={form.title}
                                    label="Nombre Producto"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    name='brand'
                                    value={form.brand}
                                    label="Marca"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    name='stock'
                                    value={form.stock}
                                    label="Stock"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Estado del producto"
                                    name='state_appliance'
                                    value={form.state_appliance}
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                >
                                    <MenuItem value="Nuevo" selected>Nuevo</MenuItem>
                                    <MenuItem value="Usado">Usado</MenuItem>
                                    <MenuItem value="Reacondicionado">Reacondicionado</MenuItem>
                                    <MenuItem value="Reparado">Reparado</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Precio"
                                    name='price'
                                    value={form.price}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Método de entrega"
                                    name='delivery_method'
                                    value={form.delivery_method}
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                >
                                    <MenuItem value="Envio gratis" selected>Envio gratis</MenuItem>
                                    <MenuItem value="Acuerdo Mutuo">Acuerdo Mutuo</MenuItem>
                                </TextField>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-number"
                                    label="Categoria"
                                    name='categorie_id'
                                    value={form.categorie_id}
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleForm}
                                >
                                    <MenuItem value="1" selected>Refrigeradores</MenuItem>
                                    <MenuItem value="2">Cocina</MenuItem>
                                    <MenuItem value="3">Microondas</MenuItem>
                                    <MenuItem value="4">Iron</MenuItem>
                                    <MenuItem value="5">Lavadora</MenuItem>
                                    <MenuItem value="6">Televisión</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden type="file" accept="image/*" value={form.image} name='image' onChange={handleForm}/>
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Descripción"
                                    name='detail'
                                    value={form.detail}
                                    multiline
                                    onChange={handleForm}
                                    rows={6}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className="submit-button-container" style={{ paddingBottom: '5rem' }}>

                        <button >
                            CONFIRM
                        </button>

                    </div>
                </form>

            </div>


        </div>
    )*/