import React, { useEffect, useState } from 'react'

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const theme = createTheme();

const FormAvatar = (avatar) => {
    const navigate = useNavigate(); // Función para navegar
    const tokenUser = localStorage.getItem('token') // Función para traer el token del usuario
    const [error, setError] = useState(false); // Constante para mostrar errores
    const [imageUrl, setImageUrl] = useState(avatar.avatar);
    const [image, setImage] = useState(null);

    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageUrl(reader.result);
            document.querySelector("#preview-img").src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
        }
    }


    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    // Función para manejar el submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('image', file);

        try {


            await axios.post(
                `https://offhouse.herokuapp.com/api/profile/avatar`,
                formData, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            );

            navigate("/profile");
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
        }
    }

    useEffect(() => {
        setImage(avatar.avatar);
        setImageUrl(avatar.avatar);
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
                        Editar Imagen de Perfil
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {error &&

                            <Alert severity="error" sx={{ mb: '3%' }}>Error al subir la imagen!</Alert>
                        }

                        <Grid container spacing={3} >

                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }} >
                                <Typography component="h5" variant="h8" align="left" sx={{ color: 'rgba(0, 0, 0, 0.6)'  }}>
                                    Avatar
                                </Typography>
                                <img id="preview-img" src={imageUrl} alt="preview"
                                />
                                <Button variant="contained" component="label" style={{ width: 300, marginTop: '2%', minWidth: 300 }}>
                                    <PhotoLibraryIcon />
                                    Subir imagen
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"

                                        id="avatar" name='avatar'
                                        onChange={(event) => {
                                            setImage(event.target.files[0]);
                                            handleImageChange(event);
                                        }} />
                                </Button>
                            </Grid>


                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                                    onClick={(event) => {
                                        handleSubmit(event);
                                    }}
                                >
                                    Confirmar
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>


    )
}

export default FormAvatar;