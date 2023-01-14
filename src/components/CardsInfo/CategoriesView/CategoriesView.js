import React, { useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Labelgiant from "../../atoms/Labelgiant/Labelgiant";
import axios from 'axios';
export const CategoriesView = () => {

  const navigate = useNavigate(); // Para navegar entre rutas
  const token = localStorage.getItem('token'); // Obtenciíon del token del local storage
  const [categories, setCategories] = useState([]) // Constante

  // Obtener categorías
  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/admin/categories',
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      setCategories(response.data.data.categories);
      console.log(response.data.data.categories);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  // Obtener categorías al cargar el componente
  useEffect(() => {
    getCategories();
  }, []);


  return (
    <div>
      <Labelgiant
        text={"Categorías"}
      />
      <div style={{ marginTop: '2%', }}>

        <Container sx={{ py: 1 }} maxWidth="lg">
          <Grid container spacing={2}>
            {categories.map((categories, index) => (
              <Grid item key={categories.id} xs={12} sm={6} md={4} >
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
                  <CardActionArea onClick={() => navigate(`/categories/view/${categories.id}`)}>
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        py: '5%',
                        width: '100%',
                        height: '200px',
                      }}
                      image={categories.imagen}
                      alt="random"
                    />
                    <CardContent >
                      <Typography variant="h5" component="h3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {categories.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

      </div>
    </div>
  )
}




/* const getCategories = async () => {
  try {
    const response = await axios.get(
      'https://offhouse.herokuapp.com/api/admin/categories',
      { headers: { 'accept': 'application/json', 'authorization': token } }
    );
    console.log(response.data.data.categories);
    setCategories(response.data.data.categories);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getCategories();
}, [getCategories]); */