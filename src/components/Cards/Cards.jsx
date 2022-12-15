import React, { useState } from 'react';
import Imagenes from "../../Imagenes";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircleIcon from '@mui/icons-material/Circle';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const commonStyles = {

  borderColor: '#000',
  borderWidth: 3,

};



export default function MultiActionAreaCard() {
  const variable = 11;


  const colorproduct = variable > 10 ? "#FF0000" : "#0FFF18";
  return (
    <Container sx={{ py: 5 }} maxWidth="lg">
      <Grid container spacing={12}>
        {cards.map((card) => (
          <Grid item key={card} xs={4} sm={4} md={3} >
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
              <CardContent sx={{ flexGrow: 2 }}>
                <Typography variant="h7" component="h3">
                  $ 1000
                </Typography>
                <Typography variant="h5" component="h5">
                  IPhone 10
                </Typography>
                <div className="rtcontainer" style={{display: 'flex'}}>
                  <CircleIcon style={{ color: colorproduct, paddingRight: '10px',width: '20' }} />
                  <Typography noWrap style={{paddingTop: '2px'}} >
                    Usado
                  </Typography>
                </div>

              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}