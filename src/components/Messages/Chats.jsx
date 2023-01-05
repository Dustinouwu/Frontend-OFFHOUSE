import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'

const Chats = () => {
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const tokenUser = localStorage.getItem('token')
    const { id } = useParams();

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

    const showMessages = async () => {
        try {
            const response = await axios.post(
                `https://offhouse.herokuapp.com/api/user/${id}/messages`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setContacts(response.data.data.sentMessages)
            console.log(response.data.data.sentMessages)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContacts()
    }, [])

    return (
        
            <div className='chats'>

                {contacts.map((contacts) => (
                    <div className='userChat'>


                        <div key={contacts.id}>
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

