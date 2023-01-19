import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import FormAvatar from "./FormAvatar";
const UpdateAvatar = () => {
    const [user, setuser] = useState({});
    const tokenUser = localStorage.getItem("token");
    const { id } = useParams();
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/profile`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                setuser(response.data.data.avatar);
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    }, [])

    return (
        <div>
            <div className="create-product">
                {
                    Object.keys(user).length > 0 ?
                        (
                            <>
                                <FormAvatar avatar={user} />
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

export default UpdateAvatar;