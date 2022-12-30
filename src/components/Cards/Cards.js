import React, { useEffect, useState } from 'react';
import Imagenes from "../../Imagenes";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';

export default function MultiActionAreaCard() {

  /* FUNCIÓN PÁRA NAVEGAR */
  const navigate = useNavigate();

  /* FUNCIÓN PARA LISTAR LOS PRODUCTOS */
  const [products, setProducts] = useState([]);

  /* FUNCIÓN PARA PODER RECUPERAR EL TOKEN */
  const token = localStorage.getItem('token');

  /* FUNCION PARA PODER SACAR LOS PRODUCTOS DE LA API */
  const getProducts = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/products',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.products.data);
      setProducts(response.data.data.products.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* FUNCIÓN PARA RENDERIZAR LA FUNCIÓN getProducts AL CARGAR LA PÁGINA*/
  useEffect(() => {
    getProducts();
  }, []);

  /*FUNCIÓN PARA CAMBIAR EL COLOR DEPENDIENDO EL ESTADO*/
  const colorprod2 = products.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });



  return (
    <div>

      <Container sx={{ py: 5 }} maxWidth="lg">
        <Grid container spacing={2}>
          {products.map((products, index) => (
            <Grid item key={products.id} xs={12} sm={6} md={4} >
              <Card
                sx={{
                  height: '100%',
                  maxWidth: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: 3,
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
                    <Typography variant="h5" component="h3">
                      ${products.price}
                    </Typography>
                    <Typography variant="h6" component="h5">
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
                  style={{ color: 'white', backgroundColor: '#FF9901' }}
                  onClick={() => navigate(`/viewproduct/${products.id}`)}
                >
                  Ver Producto
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>




    </div>
  );
}



{/* <Grid item key={products.id} xs={4} sm={4} md={3} >
            <Card
              sx={{
                height: '100%',
                maxWidth: '250px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                border: 3,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    py: '5%',
                  }}
                  image={Imagenes.img5}
                  alt="random"
                />
                <CardContent >
                  <Typography variant="h7" component="h3">
                    $ 1000
                  </Typography>
                  <Typography variant="h6" component="h5">
                    IPhone 10
                  </Typography>
                  <div className="rtcontainer" style={{ display: 'flex' }}>
                    <CircleIcon style={{ color: colorproduct, paddingRight: '10px', width: '20' }} />
                    <Typography noWrap style={{ paddingTop: '2px' }} >
                      Usado
                    </Typography>
                  </div>

                </CardContent>
              </CardActionArea>
            </Card>
          </Grid> */}