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

export const CardProduct = () => {

    const { id } = useParams(); //Trae el id de la url
    const tokenUser = localStorage.getItem('token') //Trae el token del usuario
    const [product, setProduct] = useState({})  //Estado para guardar los datos del producto
    const [user, setUser] = useState([])

    const getUser = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);

            console.log(response.data.data.user);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/products/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                const user2 = { ...response.data.data.product, id }
                setProduct(user2);



            } catch (error) {
                console.log(error);
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
                                width: '60%',
                                py: '2%',
                                maxWidth: '400px',
                                maxHeight: '200px',
                                
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
                                Precio: ${product.price}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Estado: {product.state_appliance}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Marca: {product.brand}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Stock: {product.stock}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Celular: {product.phone}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Dirección: {product.address}
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
        </div >


    )
}


{/* <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%', paddingTop: '5%', paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', borderRadius: '35px', backgroundColor: '#D9D9D9' }} >
<div style={{ display: 'flex', gap: '6rem', marginLeft: '5%' }}>
    <CardMedia
        component="img"
        sx={{
            // 16:9
            py: '2%',
            width: '40%',
            height: '500px',
        }}
        image={product.image}
    />
    <div >
        <h1 id='titleprod'> {product.title}</h1>
        <h2 id='labelprod'>Precio: ${product.price} </h2>
        <h2 id='labelprod'>Estado: {product.state_appliance}</h2>
        <h2 id='labelprod'>Marca: {product.brand} </h2>
        <h2 id='labelprod'>Stock: {product.stock} </h2>    
        <h2 id='labelprod'>Celular: {product.phone} </h2>      
        <h2 id='labelprod'>Dirección: {product.address} </h2>     
        <h2 id='labelprod'>Fecha de publicación: {product.updated_at} </h2>    
        < ModalMessage product={product} />
    </div>

</div>
<div style={{ display: 'flex', marginLeft: '5%', flexDirection: 'column', alignItems: 'flex-start' }}>
    <h1 id='labelhelp'>Características</h1>
    <h2 id='labelprod2'>{product.detail}</h2>
</div>
<div>
    <div className='footer-lineseparator' style={{ marginTop: '1%', backgroundColor: 'black' }}></div>
    <h1 id='labelhelp'>Comentarios</h1>
    <Comments />

</div>

</div > */}



