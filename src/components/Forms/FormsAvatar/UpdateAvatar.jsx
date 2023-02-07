import axios from "axios";
import React, { useEffect, useState } from "react"
import FormAvatar from "./FormAvatar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const UpdateAvatar = () => {
    const [user, setuser] = useState({});
    const tokenUser = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://offhouse.herokuapp.com/api/profile`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                setuser(response.data.data.avatar);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getUser()
    }, [])

    return (
        <div>
            {
                loading ? (
                    <Box sx={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                    </Box>
                ) : (
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
                )
            }
           
        </div>
    )


}

export default UpdateAvatar;