import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const CardsSubscription = () => {
    const navigate = useNavigate();
    return (
        <div style={{ marginTop: '5%', marginLeft: '25%', marginRight: '25%', display: 'flex' }}>
            <Card sx={{ maxWidth: 300, mr: 5, boxShadow: '15px 0 5px -5px rgba(0, 0, 0, 0.2), -8px 0 15px -5px rgba(0, 0, 0, 0.2)', }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        SUBSCRIPCIÓN
                    </Typography>
                    <Divider />
                    <Typography variant="body2" sx={{ color: '#FF9901', fontSize: 50 }}>
                        $ 4.99
                    </Typography>
                    <Typography variant="h5" component="div">
                        Quieres Que tu producto sea visible dentro de la plataforma?
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Por un módico precio, tu producto será visible para todos los usuarios de la plataforma
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 16 }}>
                        <strong>Dudas resueltas</strong> con priridad
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button 
                    size="small" 
                    variant="contained" 
                    sx={{ backgroundColor: '#FF9901', color: 'white', '&:hover': { backgroundColor: '#FF9901' } }}
                    >Suscribirse</Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 300, boxShadow: '15px 0 5px -5px rgba(0, 0, 0, 0.2), -8px 0 15px -5px rgba(0, 0, 0, 0.2)', }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        PUBLICA UN PRODUCTO
                    </Typography>
                    <Divider />
                    <Typography variant="body2" sx={{ color: '#FF9901', fontSize: 50 }}>
                        $ 0
                    </Typography>
                    <Typography variant="h5" component="div">
                        Quieres vender un producto dentro de nuestra plataforma?
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Llena el formulario para poder subir tu producto y listo, tu producto estará visible para los otros usuarios
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 16 }}>
                        <strong>No tiene ningún costo adicional</strong>
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/CreateProduct`)}
                        sx={{ backgroundColor: '#FF9901', color: 'white', '&:hover': { backgroundColor: '#FF9901' } }}
                    >Vende tu Producto</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CardsSubscription