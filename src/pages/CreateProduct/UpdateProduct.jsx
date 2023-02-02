import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import FormUpdataPro from "../../components/Forms/FormCreProduct/FormUpdataPro";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const tokenUser = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem('user')) || {};




    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/products/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                const user = { ...response.data.data.product, id }

                setProduct(user);
                console.log(setProduct);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [])


    return (
        <div>
            {
                user.id === product.user_id ?
                    (
                        <div className="create-product">
                            {
                                Object.keys(product).length > 0 ?
                                    (
                                        <>
                                            <FormUpdataPro products={product} />
                                        </>
                                    )
                                    :
                                    (
                                        <Box sx={{ display: 'flex', height: '80vh', justifyContent: 'center' }}>
                                            <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                                        </Box>
                                    )
                            }
                        </div>
                    )
                    :
                    (
                        <Box sx={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                        </Box>
                    )
            }

        </div>
    )

}

