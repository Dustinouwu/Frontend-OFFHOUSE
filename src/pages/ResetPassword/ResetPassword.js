import React from 'react';
import './ResetPassword.css';
import Title from "../../components/atoms/Title/Title";
import Label from "../../components/atoms/Label/Label";
import Imagenes from '../../Imagenes';
import { Link } from "react-router-dom";
import { Grid } from '@mui/material';



export const ResetPassword = () => {


    return (
        <div className="main-container">

            {/* <div className="image-container"> */}
            {/* <img src={Imagenes.img1} alt='Imagen Electrodomésticos'></img> */}
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        
                    }}
                />
            </Grid>
            {/*  </div> */}

            <div className="login-container">
                <form className="formlogin">
                    <Title text='Recuperación de contraseña '></Title>
                    
                    <Label
                        text='CORREO'
                    />

                    <input
                        id="mailcre"
                        type='email'
                        
                        className="inputstyle"
                        placeholder="example@example.com"
                        >
                    </input>
                    



                    <div className="submit-button-container">
                        <button>CONFIRMAR </button>
                    </div>

                    

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h5>Crea tu cuenta</h5>

                        <div className="signup-container">
                            
                            <Link to="/*" ><h5 className="singupl">Ya tienes una cuenta?</h5></Link>
                        </div>

                        
                           
                        
                    </div>
                </form>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>


        </div >
    )

}

