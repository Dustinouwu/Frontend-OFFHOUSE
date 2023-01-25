import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import FormUpdataPro from "../../components/Forms/FormCreProduct/FormUpdataPro";
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
                                        <h1>Loading...</h1>
                                    )
                            }
                        </div>
                    )
                    :
                    (
                        <h1>Loading...</h1>
                    )
            }

        </div>
    )

}

