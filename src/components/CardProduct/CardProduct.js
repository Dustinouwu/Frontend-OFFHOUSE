import { Button, CardMedia } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../Comments/Comments'
import RateReviewIcon from '@mui/icons-material/RateReview';
export const CardProduct = () => {

    const [product, setProduct] = useState({})
    const { id } = useParams();
    const tokenUser = localStorage.getItem('token')

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/products/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }

                )
                const user = { ...response.data.data.product, id }
                setProduct(user);

            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [])

   


    return (

        <div style={{ marginLeft: '5%', marginRight: '5%', backgroundColor: '' }} >
            <div style={{ display: 'flex', gap: '6rem', marginLeft: '5%' }}>
                <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        py: '5%',
                        width: '40%',
                        height: '500px',
                    }}
                    image={product.image}
                />
                <div >
                    <h1 id='labelhelp'> {product.title}</h1>
                    <h2>Precio: {product.price} </h2>
                    <h2>Estado: {product.state_appliance}</h2>
                    <h2>Marca: {product.brand} </h2>
                    <Button variant="text" startIcon={<RateReviewIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'blue' }}>
                        CONTACTAR CON EL VENDEDOR
                    </Button>
                </div>

            </div>
            <div style={{ display: 'flex', marginLeft: '5%', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h1 id='labelhelp'>Características</h1>
                <h2 >{product.detail}</h2>
            </div>
            <div>
                <h1 id='labelhelp'>Comentarios</h1>
                <Comments />

            </div>

        </div>


    )
}



