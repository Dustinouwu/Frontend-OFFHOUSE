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
      console.log(response.data.data.products.data);
      setProducts(response.data.data.products.data);
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

  /*FUNCIÓN PARA CAMBIAR EL COLOR DEPENDIENDO EL ESTADO*/
  const colorprod2 = products.map((products) => {
    return (
      products.state_appliance === 'Nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'nuevo' ? "#0FFF18" : '#FF0000' && products.state_appliance === 'reacondicionado' ? "#FFF100" : '#FF0000'
    )

  });
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
  const firstTenProducts = products.slice(0, 10);
  console.log(firstTenProducts);

  return (
    <div className="App">
      <Slider {...settings}>
        {firstTenProducts.map((item) => (
          <div className="card">
            {item.featured === 1 ? 
            <div className="card-top">
              <CardMedia
                component="img"
                image={item.image}
                alt="green iguana"
              />
            <div className="card-bottom">
              <h3 id="titless">{item.title}</h3>
              <h3 id="pricess">${item.price}</h3>
            </div>
            </div>  
            : null
            }
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider