import React, { useEffect, useState } from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Productpremium = () => {

    const navigate = useNavigate(); // Para poder navegar entre las páginas
    const tokenUser = localStorage.getItem('token')
    const token = localStorage.getItem('token');
    const [products, setProducts] = useState([])
    const [productsbyid, setProductsbyid] = useState([])
    const [error, setError] = useState('')
    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/subscriptions',
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            console.log(response.data.data.subscriptions);
            setProducts(response.data.data.subscriptions);
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

    useEffect(() => {
        getProducts();
        getProductsUser();
    }, []);


    return (
        <div>
            {
                products.map((product) => (
                    <Card sx={{ maxWidth: '100%', mt: 10, ml: 10, mr: 10 }}>
                        <CardMedia
                            sx={{ float: "left", width: 200, height: 200 }}
                            component="img"
                            alt="green iguana"
                            image={getImageAndTitle(product.product_id).image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {getImageAndTitle(product.product_id).title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    )
}

export default Productpremium