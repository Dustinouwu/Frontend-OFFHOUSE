import React, { useEffect, useState } from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Alert,
    Grid,
    Paper,
    Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '200px',
    maxHeight: '200px',
});
const Productpremium = () => {

    const navigate = useNavigate(); // Para poder navegar entre las páginas
    const tokenUser = localStorage.getItem('token')
    const token = localStorage.getItem('token');
    const [products, setProducts] = useState([])
    const [productsbyid, setProductsbyid] = useState([])
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState('')

    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    const getProducts = async (page) => {
        try {
            const response = await axios.get(
             `https://offhouse.herokuapp.com/api/subscriptions?page=${page}`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            setProducts(response.data.data.subscriptions.data);
            setLastPage(response.data.data.pagination.last_page)
            if (response.status === 403) {
                setError('')
            }
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
            console.log(error.response.data.message, 'error');
        }
    };

    const getProductsUser = async () => {
        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/products/myProducts/list',
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
                config
            );
            setProductsbyid(response.data.data.products.data);
            console.log(response.data.data.products.data);
        } catch (error) {
            console.log(error.response.data.message, 'error');
        }
    };

    //Sacar la imagen y el titulo del producto por id del usuario
    const getImageAndTitle = (id) => {
        const product = productsbyid.find((product) => product.id === id);
        if (product) {
            return { image: product.image, title: product.title }
        } else {
            return { image: '', title: '' }
        }
    }

    //poner una barra dependiendo del estado del producto
    const getBar = (product) => {
        if (product.status === 'active') {
            return <Alert severity="success">Suscripción Activa</Alert>
        } else if (product.status === 'expired') {
            return <Alert severity="warning">Suscripción expirada</Alert>
        } else if (product.status === 'canceled') {
            return <Alert severity="error">Suscripción cancelada</Alert>
        }
    }

    useEffect(() => {
        getProducts();
        getProductsUser();
        page === 1 ? setPage(1) : setPage(lastPage);
    }, []);


    return (
        <div>
            <Typography gutterBottom variant="h3" component="div" align='center' sx={{ mt: 5 }}>
                Mis suscripciones
            </Typography>
            {
                products.map((product) => (
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: '80%',
                            flexGrow: 1,
                            mt: 3,
                            mb: 3,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>

                            <Grid item>
                                <Img alt="complex" src={getImageAndTitle(product.product_id).image} />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {getImageAndTitle(product.product_id).title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Fecha de inicio: {product.start_date}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Fecha de vencimiento: <strong>{product.end_date}</strong>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Precio de suscripción: ${product.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant='contained' align='center' sx={{ whiteSpace: 'nowrap', mb: 5 }} onClick={() => navigate(`/payment/product/${product.product_id}`)}>
                                            visualizar suscripción
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={10}  md={6} >
                                    <Typography variant="subtitle1" component="div">
                                        {getBar(product)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            }
           <Pagination count={lastPage} variant="outlined" page={page} onChange={(event, value) => {
          setPage(value);
          getProducts(value);
          window.scrollTo(0, 0);
          }} />
        </div >
    )
}

export default Productpremium