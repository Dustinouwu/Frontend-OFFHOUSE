import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Profile = () => {

    const tokenUser = localStorage.getItem('token')

    const [user, setUser] = useState([])
    const [avatar , setAvatar] = useState([])

    const getUser = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);
            setAvatar(response.data.data.avatar)
            
            console.log(response.data.data.avatar);


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
       
        getUser()

    }, [])

    return (
        <div>
            <h1>Nombre Usuario: {user.username}</h1>
            
            <img src={avatar} alt="avatar" />
        </div>
    )
}

