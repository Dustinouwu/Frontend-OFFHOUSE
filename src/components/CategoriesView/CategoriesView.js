import React, { useEffect, useState } from 'react';
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
export const CategoriesView = () => {

  const [categories, setCategories] = useState([])
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getCategories = async () => {
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
  }, []);
  return (
    <div>
      <div style={{ marginTop: '7%', }}>
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
                      image={categories.image}
                      alt="random"
                    />
                    <CardContent >
                      <Typography variant="h5" component="h3" style={{display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
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

