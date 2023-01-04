import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Profile = () => {

    const tokenUser = localStorage.getItem('token')

    const [user, setUser] = useState([])
    const [avatar, setAvatar] = useState([])

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
            <div style={{ marginLeft: '5%', marginRight: '5%', marginTop: '2%', paddingTop: '5%', paddingLeft: '2%', paddingBottom: '5%', paddingRight: '2%', borderRadius: '35px', backgroundColor: '#D9D9D9' }} >
                <div style={{ display: 'flex', gap: '6rem', marginLeft: '5%' }}>
                    <img src={avatar} alt="avatar" style={{ width: '15%' }} />
                    <h1 id='labelprod'>{user.username}</h1>

                    
                </div>

            </div>

        </div>
    )
}

