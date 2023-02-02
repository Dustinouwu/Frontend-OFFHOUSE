import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Chats = () => {

    const [contacts, setContacts] = useState([])
    const navigate = useNavigate();
    const tokenUser = localStorage.getItem('token')
    const [loading, setLoading] = useState(true);

    const getContacts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/user/contacts`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setContacts(response.data.data.contacts)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }


    useEffect(() => {
        getContacts()

    }, [])






    return (
        <div className='chats' >
            {
                loading ? (
                    <Box sx={{ display: 'flex', mt: 5, justifyContent: 'center', alignContent: 'center' }}>
                        <CircularProgress size={50} sx={{ color: 'black' }} />
                    </Box>
                ) : (
                    contacts.map((contacts) => (
                        <div className='userChat'>
                            <div key={contacts.id}
                                onClick={() => navigate(`/chats/${contacts.id}`)}
                            >
                                <img src={contacts.avatar} alt='user' />
                                <div className='userChatInfo'>
                                    <span>{contacts.username}</span>
                                </div>
                            </div>
                        </div>
                    ))

                )
            }

        </div>

    )
}

export default Chats

