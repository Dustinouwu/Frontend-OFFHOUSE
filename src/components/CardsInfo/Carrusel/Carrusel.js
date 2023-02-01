import React, { useEffect, useState } from "react"
import Slider from "react-slick";
import './index.css'
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import './Carrusel.css'
const SimpleSlider = () => {

  const navigate = useNavigate(); // Para poder navegar entre las páginas
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('')

  /* FUNCION PARA PODER SACAR LOS PRODUCTOS DE LA API */
  const getProducts = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/products',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.products);
      setProducts(response.data.data.products);
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
  }, []);




  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // filtrar los productos con featured = 1
  const firstTenProducts = products.filter((item) => item.featured === 1);
  console.log(firstTenProducts, 'firstTenProducts');
  //Solo mostrar los productos de la categoria 1
  const firstTenProducts1 = firstTenProducts.filter((item) => item.categorie_id === 1);
  const firstTenProducts2 = firstTenProducts.filter((item) => item.categorie_id === 2);
  const firstTenProducts3 = firstTenProducts.filter((item) => item.categorie_id === 3);
  const firstTenProducts4 = firstTenProducts.filter((item) => item.categorie_id === 4);
  const firstTenProducts5 = firstTenProducts.filter((item) => item.categorie_id === 5);
  const colorprod2 = firstTenProducts1.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });
  const colorprod3 = firstTenProducts2.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });
  const colorprod4 = firstTenProducts3.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });
  const colorprod5 = firstTenProducts4.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });
  const colorprod6 = firstTenProducts5.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });



  return (
    <div className="App">
      <h2 className="title">Destacados de Refrigeradoras</h2>
      <Slider {...settings}>
        {firstTenProducts1.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} onClick={() => navigate(`/viewproduct/${item.id}`)}>
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
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    py: '5%',
                    width: '100%',
                    height: '200px',
                  }}
                  image={item.image}
                  alt="random"
                />
                
                <CardContent >
                <Typography variant="h6" color="text.secondary">
                  {item.brand}
                </Typography>
                  <Typography variant="h5" component="h3">
                    ${item.price}
                  </Typography>
                  <Typography variant="h6" component="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}>
                    {item.title}
                  </Typography>

                  <div className="rtcontainer" style={{ display: 'flex' }}>
                    <CircleIcon style={{ color: colorprod2[index], paddingRight: '10px', width: '20' }} />
                    <Typography noWrap style={{ paddingTop: '2px' }} >
                      {item.state_appliance}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <Button
                variant="text"
                startIcon={<RemoveRedEyeIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: '#FF9901', position: 'absolute', display: 'fixed', }}
                onClick={() => navigate(`/viewproduct/${item.id}`)}
              >
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Slider>
      <h2 className="title">Destacados de Cocinas</h2>
      <Slider {...settings}>
        {firstTenProducts2.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} onClick={() => navigate(`/viewproduct/${item.id}`)} >
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
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    py: '5%',
                    width: '100%',
                    height: '200px',
                  }}
                  image={item.image}
                  alt="random"
                />
                <CardContent >
                  <Typography variant="h5" component="h3">
                    ${item.price}
                  </Typography>
                  <Typography variant="h6" component="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}>
                    {item.title}
                  </Typography>
                  <div className="rtcontainer" style={{ display: 'flex' }}>
                    <CircleIcon style={{ color: colorprod3[index], paddingRight: '10px', width: '20' }} />
                    <Typography noWrap style={{ paddingTop: '2px' }} >
                      {item.state_appliance}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <Button
                variant="text"
                startIcon={<RemoveRedEyeIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: '#FF9901', position: 'absolute', display: 'fixed', }}
                onClick={() => navigate(`/viewproduct/${item.id}`)}
              >
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Slider>
      <h2 className="title">Destacados de Microondas </h2>
      <Slider {...settings}>
        {firstTenProducts3.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} onClick={() => navigate(`/viewproduct/${item.id}`)}>
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
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    py: '5%',
                    width: '100%',
                    height: '200px',
                  }}
                  image={item.image}
                  alt="random"
                />
                <CardContent >
                  <Typography variant="h5" component="h3">
                    ${item.price}
                  </Typography>
                  <Typography variant="h6" component="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}>
                    {item.title}
                  </Typography>
                  <div className="rtcontainer" style={{ display: 'flex' }}>
                    <CircleIcon style={{ color: colorprod4[index], paddingRight: '10px', width: '20' }} />
                    <Typography noWrap style={{ paddingTop: '2px' }} >
                      {item.state_appliance}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <Button
                variant="text"
                startIcon={<RemoveRedEyeIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: '#FF9901', position: 'absolute', display: 'fixed', }}
                onClick={() => navigate(`/viewproduct/${item.id}`)}
              >
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Slider>
      <h2 className="title">Destacados de Planchas</h2>
      <Slider {...settings}>
        {firstTenProducts4.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} onClick={() => navigate(`/viewproduct/${item.id}`)} >
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
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    py: '5%',
                    width: '100%',
                    height: '200px',
                  }}
                  image={item.image}
                  alt="random"
                />
                <CardContent >
                  <Typography variant="h5" component="h3">
                    ${item.price}
                  </Typography>
                  <Typography variant="h6" component="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}>
                    {item.title}
                  </Typography>
                  <div className="rtcontainer" style={{ display: 'flex' }}>
                    <CircleIcon style={{ color: colorprod5[index], paddingRight: '10px', width: '20' }} />
                    <Typography noWrap style={{ paddingTop: '2px' }} >
                      {item.state_appliance}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <Button
                variant="text"
                startIcon={<RemoveRedEyeIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: '#FF9901', position: 'absolute', display: 'fixed', }}
                onClick={() => navigate(`/viewproduct/${item.id}`)}
              >
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Slider>
      <h2 className="title">Destacados de Lavadoras</h2>
      <Slider {...settings}>
        {firstTenProducts5.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} onClick={() => navigate(`/viewproduct/${item.id}`)}>
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
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    py: '5%',
                    width: '100%',
                    height: '200px',
                  }}
                  image={item.image}
                  alt="random"
                />
                <CardContent >
                  <Typography variant="h5" component="h3">
                    ${item.price}
                  </Typography>
                  <Typography variant="h6" component="h5" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', maxHeight: '30px' }}>
                    {item.title}
                  </Typography>
                  <div className="rtcontainer" style={{ display: 'flex' }}>
                    <CircleIcon style={{ color: colorprod6[index], paddingRight: '10px', width: '20' }} />
                    <Typography noWrap style={{ paddingTop: '2px' }} >
                      {item.state_appliance}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <Button
                variant="text"
                startIcon={<RemoveRedEyeIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: '#FF9901', position: 'absolute', display: 'fixed', }}
                onClick={() => navigate(`/viewproduct/${item.id}`)}
              >
                Ver Producto
              </Button>
            </Card>
          </Grid>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider