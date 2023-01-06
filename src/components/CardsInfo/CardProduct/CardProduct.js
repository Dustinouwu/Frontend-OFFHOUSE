import { Button, CardMedia } from '@mui/material'
import './CardProduct.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../../Comments/Comments'
import SendIcon from '@mui/icons-material/Send';
import ModalMessage from './ModalMessage'
export const CardProduct = () => {

    const { id } = useParams(); //Trae el id de la url
    const tokenUser = localStorage.getItem('token') //Trae el token del usuario
    const [product, setProduct] = useState({})  //Estado para guardar los datos del producto

    //Trae los datos del producto
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
    }, [id, tokenUser])


    return (

        <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%', paddingTop: '5%', paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', borderRadius: '35px', backgroundColor: '#D9D9D9' }} >
            <div style={{ display: 'flex', gap: '6rem', marginLeft: '5%' }}>
                <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        py: '2%',
                        width: '40%',
                        height: '500px',
                    }}
                    image={product.image}
                />
                <div >
                    <h1 id='titleprod'> {product.title}</h1>
                    <h2 id='labelprod'>Precio: ${product.price} </h2>
                    <h2 id='labelprod'>Estado: {product.state_appliance}</h2>
                    <h2 id='labelprod'>Marca: {product.brand} </h2>
                    <h2 id='labelprod'>userid: {product.user_id} </h2>
                    < ModalMessage product={product}/>
                </div>

            </div>
            <div style={{ display: 'flex', marginLeft: '5%', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h1 id='labelhelp'>Características</h1>
                <h2 id='labelprod2'>{product.detail}</h2>
            </div>
            <div>
                <div className='footer-lineseparator' style={{ marginTop: '1%', backgroundColor: 'black' }}></div>
                <h1 id='labelhelp'>Comentarios</h1>
                <Comments />

            </div>

        </div >


    )
}



