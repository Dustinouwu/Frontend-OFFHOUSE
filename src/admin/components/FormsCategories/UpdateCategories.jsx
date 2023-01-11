import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import FormsCategories from "./FormsCategories";

const UpdateCategories = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [categorie, setCategories] = useState({});
    const tokenUser = localStorage.getItem('token')

    useEffect(() => {

        const getCategories = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/admin/categories/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                const user = { ...response.data.data.categorie, id }
                setCategories(user);
                console.log('update:', user);
            } catch (error) {
                console.log(error);
            }

        }
        getCategories()
    }, [])

    return (
        <div>
            <div className="create-product">
                {
                    Object.keys(categorie).length > 0 ?
                        (
                            <>
                                <FormsCategories categories={categorie} />

                            </>
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

export default UpdateCategories