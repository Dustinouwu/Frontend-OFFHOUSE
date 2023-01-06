import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './index.css'

const Chats = () => {
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate();
    const tokenUser = localStorage.getItem('token')

    const getContacts = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/user/contacts`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setContacts(response.data.data.contacts)
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(() => {
        getContacts()
        
    }, [])




    return (
        <div className='chats' >
            {contacts.map((contacts) => (
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
            }
        </div>

    )
}

export default Chats

