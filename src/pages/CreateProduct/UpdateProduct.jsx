import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Form from "../../components/Form/Form"

export const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const tokenUser = localStorage.getItem("token");

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/products/${id}/view`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                const user = { ...response.data.data.product, id }
                setProduct(user);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [])

    return (
        <div>
            <div className="create-product">
                {
                    Object.keys(product).length > 0 ?
                        (
                            <Form products={product} />
                        )
                        :
                        (
                            <h1>Loading...</h1>
                        )
                }
            </div>
        </div>
    )

}

