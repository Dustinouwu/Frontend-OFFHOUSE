import * as React from 'react';
import Card from '@mui/material/Card';
import Imagenes from '../../Imagenes';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const commonStyles = {
  m: 1,
  borderColor: '#000',
  borderWidth: 3,
  height: '250',
};


export default function MultiActionAreaCard() {
  return (
    <Card variant="outlined"
      sx={{
        maxWidth: 250,
        ...commonStyles,
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={Imagenes.img5}
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
           $ 1.000.000
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Iphone 7 Plus
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}