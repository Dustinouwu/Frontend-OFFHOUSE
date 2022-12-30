import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const CategProdCards = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `${token}` }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/admin/categories/${id}`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            )

            setCategories(response.data.data.categorie);
        } catch (error) {
            console.log(error);
        }
    };

    const getCatProduct = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products`,
                { headers: { 'accept': 'application/json', 'authorization': token } },
                config
            )
            console.log(response.data.data.products.data);
            setProducts(response.data.data.products.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filterProducts = products.filter(products => products.categorie_id === categories.id);
    console.log(filterProducts);

    useEffect(() => {
        getCategories()
        getCatProduct()
    }, [])


    return (
        <div>
            <h1>{categories.name}</h1>
            <div>
                {
                    filterProducts.map((products, index) => (
                        <div key={products.id}>
                            <h1>{products.title}</h1>
                            <h2>{products.categorie_id}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


