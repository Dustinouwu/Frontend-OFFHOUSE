import React, { useEffect, useState } from 'react'
import './Paypal.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from '../../Comments/Comments'
import SendIcon from '@mui/icons-material/Send';
import {
    List,
    ListItem,
    ListItemText,
    Alert,
    Grid
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

    const postSubsciptipn = async () => {
        try {
            const response = await axios.post(
                `https://offhouse.herokuapp.com/api/subscriptions`,
                { product_id: id },
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            navigate('/productsprimium')
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
            <div className='paypalbox' >
                <Grid container spacing={1} >
                    <Grid item  sx={{display: 'flex', flexDirection: 'column-reverse',[`@media (min-width: 900px)`]: { display: 'flex', flexDirection: 'column-reverse'}}}>
                        <Card sx={{ maxWidth: '100%', }}>

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
                                        <ListItemText primary="Detalle" align='center' />
                                        <ListItem >

                                            <ListItemText secondary={product.detail} align='center' />
                                        </ListItem>

                                    </List>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: '100%', maxHeight: '100%' , mt: 5, mb: 5 }} align='center'>
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
                                    Una vez realizada la compra, tu producto será publicado en la sección de productos premium o pantalla princial.
                                    Si deseas cancelar tu suscripción, puedes contactarnos a través de nuestro correo electrónico offhouse@offhouse.com.

                                </Typography>
                            </CardContent>

                            <PayPalScriptProvider options={{ "client-id": "AT0xfwubetSem8Phs-ka4eLvDlYeNqja0LvhkgXs4BfBVFc1lRixxDwlVifa2ah239-olrO_UdwI5zVF" }}>
                                <PayPalButtons style={{ layout: "horizontal" }}
                                    onApprove={(data, actions) => {
                                        postSubsciptipn()
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            alert(`Gracias por su compra!`);
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>

                        </Card>
                    </Grid>
                    

                </Grid>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Paypal