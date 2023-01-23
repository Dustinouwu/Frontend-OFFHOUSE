import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './index.css'
const Navbar = () => {

    const [user, setUser] = useState([])
    const tokenUser = localStorage.getItem('token')
    const [avatar, setAvatar] = useState([])
    
    const getUser = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user);
            setAvatar(response.data.data.avatar)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (


        <div className='navbar'>
            <span className="logo">OFF HOUSE</span>
            <div className="user">
                <img src={avatar} alt="avatar" />
                <span>{user.username}</span>

            </div>
        </div>
    )
}

export default Navbar