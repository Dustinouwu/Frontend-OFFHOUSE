import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, CardActionArea, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { Pageerror } from '../../../pages';
import { useScrollTrigger } from '@mui/material';
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';


export default function MultiActionAreaCard(props) {

  
  const navigate = useNavigate(); // Para poder navegar entre las páginas
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('')
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  /* FUNCION PARA PODER SACAR LOS PRODUCTOS DE LA API */
  const getProducts = async (page) => {
    try {
      const response = await axios.get(
        `https://offhouse.herokuapp.com/api/products?page=${page}`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      setProducts(response.data.data.products.data);
      setLastPage(response.data.data.pagination.last_page);
      if (response.status === 403) {
        setError('')
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
      console.log(error.response.data.message, 'error');
    }
  };
  /* FUNCIÓN PARA RENDERIZAR LA FUNCIÓN getProducts AL CARGAR LA PÁGINA*/
  useEffect(() => {
    getProducts();
    page === 1 ? setPage(1) : setPage(lastPage);
  }, []);

  //FUNCIÓN PARA CAMBIAR EL COLOR DEPENDIENDO EL ESTADO/
  const colorprod2 = products.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });



  return (
    <div style={{ marginLeft: '10%' }}>

      <Container sx={{ py: 5 }} maxWidth="lg">
        <Grid container spacing={2}>
          {products.map((products, index) => (
            <Grid item key={products.id} xs={12} sm={6} md={4} >

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
              {products.featured === 1 ? <Button style={{ backgroundColor: 'green', color: 'white', width: '100%', height: '30px', fontSize: '12px' }}>Destacado</Button> : null
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
                    <br />
                      {products.featured}
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
      <Pagination count={lastPage} variant="outlined" page={page} onChange={(event, value) => {
          setPage(value);
          getProducts(value);
}} />
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
          </Grid> */}