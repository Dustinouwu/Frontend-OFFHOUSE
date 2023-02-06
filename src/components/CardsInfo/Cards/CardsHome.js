import React, { useEffect, useState } from 'react';
import './CardsHome.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, CardActionArea, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import Box from '@mui/material/Box';


export default function MultiActionAreaCard(props) {

  
  const navigate = useNavigate(); // Para poder navegar entre las páginas
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FUNCION PARA PODER SACAR LOS PRODUCTOS DE LA API */
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://offhouse.herokuapp.com/api/products`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      setProducts(response.data.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message, 'error');
      setLoading(false);
    }
  };
  /* FUNCIÓN PARA RENDERIZAR LA FUNCIÓN getProducts AL CARGAR LA PÁGINA*/
  useEffect(() => {
    getProducts();
  }, []);

    // filtrar los productos con featured = 1
    const firstTenProducts = products.filter((item) => item.featured === 1);
    console.log(firstTenProducts, 'firstTenProducts');

  //FUNCIÓN PARA CAMBIAR EL COLOR DEPENDIENDO EL ESTADO/
  const colorprod2 = firstTenProducts.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });



  return (
    <div className='cardshome-container'>
      {products.length === 0 ? (
        <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center' }}>
        <CircularProgress size={80} sx={{ color: '#FF9901' }} />
      </Box>)
        : (
      <Container sx={{ py: 5 }} maxWidth="lg" >
        <Grid container spacing={2}>
          {firstTenProducts.map((products, index) => (
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
              {products.featured === 1 ? <Button style={{ backgroundColor: 'black', color: 'white', width: '100%', height: '30px', fontSize: '12px' }}>Destacado</Button> : null
              }
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
                  <Typography variant="h5" component="h3" style={{ color: 'green' }}>
                    ${products.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}
                  >
                    {products.title}
                  </Typography>
                  <div className="rtcontainer" style={{ display: 'flex', height: '100%' }}>
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
                Ver
              </Button>
            </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      )}
      </div>
  );
}