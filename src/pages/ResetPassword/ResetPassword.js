import React, { useState } from "react";
import './ResetPassword.css';
import Title from "../../components/Title/Title";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Imagenes from '../../Imagenes';
import { Link } from "react-router-dom";



export const ResetPassword = () => {


    return (
        /* CONTAINER MAIN LOGIN  */
        <div className="main-container">

            <div className="image-container">
                <img src={Imagenes.img1} alt='Imagen Electrodomésticos'></img>
            </div>

            <div className="login-container">
                <Title text='RESET PASSWORD'></Title>

                

                <Label
                    text='EMAIL'
                />

                <Input
                    attribute={{
                        id: 'email',
                        name: 'email',
                        type: 'email',
                        placeholder: 'das@example.com'
                    }}
                    
                />



    
                <div className="submit-button-container">
                    <Link to="/home">
                        <button  >
                            CONFIRM
                        </button>
                    </Link>

                </div>


                <div className="signup-container">
                    <h5>Not a member? </h5>
                    <Link to="/register" ><h5 className="singupl">Sign up</h5></Link>
                </div>

                <div className="signup-container">
                    <Link to="/" ><h5 className="singupl">Do you already have an account?</h5></Link>
                </div>

            </div>

            <div className="logo-container">
                <img src={Imagenes.img4} alt='Logopq'></img>
            </div>


        </div >
    )

}

 