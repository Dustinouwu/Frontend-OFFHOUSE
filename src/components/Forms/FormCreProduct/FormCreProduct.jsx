import React, { useState } from 'react'
import './FormCreProduct.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '@mui/material';


const FormCreProduct = ({ products }) => {

    const navigate = useNavigate(); // Función para navegar
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
                await axios.put(
                    `https://offhouse.herokuapp.com/api/products/${products.id}`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                );
            } else {
                await axios.post(
                    `https://offhouse.herokuapp.com/api/products`,
                    { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
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
                            {/*  <Grid item xs={6}>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <h5>
                                    Subir Imagen
                                </h5>
                                <PhotoCamera />
                            </IconButton>
                        </Grid> */}
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
    )
}

export default FormCreProduct
