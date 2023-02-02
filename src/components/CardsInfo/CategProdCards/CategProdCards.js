import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, CardActionArea, CardActions, Pagination } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Labelgiant from "../../atoms/Labelgiant/Labelgiant";
import axios from 'axios';
import Footer from '../../Layouts/Footer/Footer';



export const CategProdCards = () => {

    const { id } = useParams(); // Obtener el id de la categoría de la URL
    const navigate = useNavigate(); // Para navegar entre rutas
    const token = localStorage.getItem('token'); // Obtenciíon del token del local storage
    const [categories, setCategories] = useState([])  // Constante para las categorías
    const [products, setProducts] = useState([]);   // Constante para los productos
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const config = {
        headers: { Authorization: `${token}` }
    };

    // Obtener categorías
    const getCategories = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/admin/categories/${id}`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            )
            setCategories(response.data.data.categorie);
        } catch (error) {
            console.log(error);
        }
    };

    // Obtener productos
    const getCatProduct = async (page) => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products`,
                { headers: { 'accept': 'application/json', 'authorization': token } },
                config
            )
            setProducts(response.data.data.products);

        } catch (error) {
            console.log(error);
        }
    };
    // Renderizar categorías y productos 
    useEffect(() => {
        getCategories()
        getCatProduct()
        categories.id = id
        page === 1 ? setPage(1) : setPage(lastPage);
    }, [])

    //Función para cambiar el color del estado del producto
    const colorprod2 = products.map((products) => {
        return (
            products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
        )

    });

    //Filtro de productos por categoría
    const filterProducts = products.filter((products) => {
        return products.categorie_id === categories.id
    })

    console.log(filterProducts);


    return (
        <div >
            <div style={{ marginLeft: '10%' }}>
                <Labelgiant
                    text={categories.name}
                />
                <Container sx={{ py: 5 }} maxWidth="lg">
                    <Grid container spacing={2} >
                        {filterProducts.slice(0, itemsPerPage).map((products, index) => (
                            <Grid item key={products.id} xs={12} sm={6} md={4} onClick={() => navigate(`/viewproduct/${products.id}`)}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        maxWidth: '270px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        border: 0,
                                        boxShadow: '15px 0 5px -5px rgba(0, 0, 0, 0.2), -8px 0 15px -5px rgba(0, 0, 0, 0.2)',
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                // 16:9
                                                py: '5%',
                                                width: '100%',
                                                height: '200px',
                                            }}
                                            image={products.image}
                                            alt="random"
                                        />
                                        <CardContent >
                                            <Typography variant="h6" color="text.secondary">
                                                {products.brand}
                                            </Typography>
                                            <Typography variant="h5" component="h3">
                                                ${products.price}
                                            </Typography>
                                            <Typography variant="h6" component="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}>
                                                {products.title}
                                            </Typography>
                                            <div className="rtcontainer" style={{ display: 'flex' }}>
                                                <CircleIcon style={{ color: colorprod2[index], paddingRight: '10px', width: '20' }} />
                                                <Typography noWrap style={{ paddingTop: '2px' }} >
                                                    {products.state_appliance}
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                    <Button
                                        variant="text"
                                        startIcon={<RemoveRedEyeIcon style={{ color: 'white' }} />}
                                        style={{ color: 'white', backgroundColor: '#FF9901', position: 'absolute', display: 'fixed', }}
                                        onClick={() => navigate(`/viewproduct/${products.id}`)}
                                    >
                                        Ver Producto
                                    </Button>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container sx={{ display: 'flex', justifyContent: 'center' }} maxWidth="lg" >

                    <Button color="secondary" onClick={() => setItemsPerPage(itemsPerPage + 9)} sx={{ color: '#000' }}>Ver más</Button>
                </Container>
            </div>
        </div>
    )
}