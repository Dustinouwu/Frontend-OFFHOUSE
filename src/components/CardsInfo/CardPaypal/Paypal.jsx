import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from '../../Comments/Comments'
import SendIcon from '@mui/icons-material/Send';
import {
    List,
    ListItem,
    ListItemText,
    Alert
} from '@mui/material';


import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Divider,
} from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const style = {
    width: '100%',
    maxWidth: '100%',
    bgcolor: 'background.paper',

};

const Paypal = () => {
    const { id } = useParams(); //Trae el id de la url
    const navigate = useNavigate();
    const tokenUser = localStorage.getItem('token') //Trae el token del usuario
    const [product, setProduct] = useState({})  //Estado para guardar los datos del producto
    const [user, setUser] = useState([])
    const [error, setError] = useState(false)
    const getUser = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);

        } catch (error) {
            console.log(error);
        }
    }
    console.log(user.username)
    //alertar para cuando se envie el postSubscription y se complete la transaccion con el nombre del usuario usesr.username
    const handleOnSuccess = (user) => {
        if (user) {
            alert(`Gracias por contratar la suscripción ${user.username}!`);
        }
    };

    const postSubsciptipn = async () => {
        try {
            const response = await axios.post(
                `https://offhouse.herokuapp.com/api/subscriptions`,
                { product_id: id },
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            navigate('/profile')
            handleOnSuccess(user)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message)
            } else if (error.response && error.response.status === 422) {
                setError('El producto ya ha sido contratado para la suscripción');
            } else {
                setError('Error del servidor');
            }
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


    return (
        <div style={{ marginRight: '5%', marginLeft: '5%', marginTop: '3%', marginBottom: '3%' }}>
            {error &&
                <Alert severity="error" sx={{ mb: '3%' }}>{error}</Alert>
            }
            <div style={{ marginRight: '5%', marginLeft: '5%', marginTop: '3%', marginBottom: '3%', display: 'flex' }}>
                <Card sx={{ maxWidth: 800, }}>

                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={product.image}
                            style={{
                                width: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                marginLeft: '25%',
                                marginTop: '1%',
                                borderRadius: '25px'
                            }}
                            alt="avatar user"
                        />
                        <CardContent>
                            <Typography variant="h4" component="div" align='center'>
                                {product.title}
                            </Typography>
                            <List sx={style} component="nav" aria-label="mailbox folders" >
                                <ListItem >
                                    <ListItemText primary="Precio" />
                                    $
                                    <ListItemText secondary={product.price} align='center' />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Marca" />
                                    <ListItemText secondary={product.brand} align='center' />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Stock" />
                                    <ListItemText secondary={product.stock} align='center' />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Estado del producto" />
                                    <ListItemText secondary={product.state_appliance} align='center' />
                                </ListItem>

                                <ListItem >
                                    <ListItemText primary="Contacto" />
                                    <ListItemText secondary={product.phone} align='center' />
                                </ListItem>

                                <ListItem >
                                    <ListItemText primary="Método de envío" />
                                    <ListItemText secondary={product.delivery_method} align='center' />
                                </ListItem>

                                <ListItem >
                                    <ListItemText primary="Dirección" />
                                    <ListItemText secondary={product.address} align='center' />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Detalle" />
                                    <ListItemText secondary={product.detail} align='center' />
                                </ListItem>

                            </List>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: '40%', maxHeight: 500, marginLeft: '2%' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Paga tu suscripción con Paypal
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div" align='center' color='#FF9901'>
                            $ <strong>4.99</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Paga un módico precio para que tu producto sea más visible y puedas venderlo más rápido.

                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Si no está satisfecho con su compra, tiene 14 días a partir de la fecha de entrega para solicitar un reembolso o un intercambio. Por favor, póngase en contacto con nosotros a través de nuestro correo electrónico o número de teléfono para iniciar el proceso de devolución. Todos los productos deben ser devueltos en su embalaje original y en condiciones nuevas para ser elegibles para un reembolso o intercambio."

                        </Typography>
                    </CardContent>

                    <PayPalScriptProvider options={{ "client-id": "AT0xfwubetSem8Phs-ka4eLvDlYeNqja0LvhkgXs4BfBVFc1lRixxDwlVifa2ah239-olrO_UdwI5zVF" }}>
                        <PayPalButtons style={{ layout: "horizontal" }}
                            onApprove={(data, actions) => {
                                postSubsciptipn()
                                return actions.order.capture().then((details) => {
                                    const name = details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`);


                                });
                            }}
                        />
                    </PayPalScriptProvider>

                </Card>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Paypal