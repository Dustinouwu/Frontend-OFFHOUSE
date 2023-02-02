import './CardProduct.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../../Comments/Comments'
import SendIcon from '@mui/icons-material/Send';
import ModalMessage from './ModalMessage'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material'
import Modalcomments from '../../Comments/Modalcomments'
import ModalDelete from '../../Comments/ModalDelete'
import { Container } from '@mui/system'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const CardProduct = () => {

    const { id } = useParams(); //Trae el id de la url
    const tokenUser = localStorage.getItem('token') //Trae el token del usuario
    const [product, setProduct] = useState({})  //Estado para guardar los datos del producto
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/products/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                const user2 = { ...response.data.data.product, id }
                setProduct(user2);
                setLoading(false);
                console.log(response.data.data.product);



            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getProduct()
        getUser()
    }, [id, tokenUser])

    const date = new Date(product.updated_at)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const datePublication = `${day}/${month}/${year}`




    return (
        <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '3%', marginBottom: '5%' }} >
             {
                 loading ? (
                    <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                  </Box>  
                  )
                  :
                  (
                <>
            <Card sx={{ maxWidth: '100%', pl: 5, pt: 5, pr: 5, pb: 5 }}>
                <Typography gutterBottom variant="h3" component="div">
                    {product.title}
                </Typography>
                <Grid container direction="row">
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mb: 4, border: '1px solid #D9D9D9', }}>
                        <CardMedia
                            component="img"
                            sx={{
                                margin: 'auto',
                                display: 'block',
                                width: '100%',
                                py: '6%',
                                pb: '6%',
                                maxWidth: '400px',
                                maxHeight: '400px',
                                
                            }}
                            image={product.image}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Fecha de publicación: {datePublication}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                        <CardContent>
                            <Typography variant="h6" component="div" color="success">
                                <strong>Precio: </strong>
                            </Typography>
                            <Typography variant="h6" component="div" color="success">
                                ${product.price}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                            <strong>Estado: </strong> 
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                            {product.state_appliance}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                               <strong> Marca:</strong> 
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                              {product.brand}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                            <strong> Stock:</strong>  
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                             {product.stock}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                            <strong> Celular:</strong>  
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                            {product.phone}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                            <strong> Dirección:</strong>  
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                              {product.address}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <ModalMessage product={product} />
                        </CardActions>

                    </Grid>
                </Grid>
                <Divider />
                <CardContent>
                    <Typography variant="h4" color="text.primary">
                        Descripción
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        {product.detail}
                    </Typography>
                </CardContent>
                <Grid container spacing={1} direction="row" wrap="wrap" >
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Modalcomments />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <ModalDelete />
                    </Grid>
                </Grid>

            </Card>
            <div style={{ marginTop: '3%', marginRight: '9.5%', width: '100%', }}>
                <Comments product={product} />
            </div>
                </>
            )}

        </div >


    )
}