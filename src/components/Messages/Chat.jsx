import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.css'
import Input from './Input'
import Messages from './Messages'
const Chat = () => {

    const { id } = useParams()
    const [contacts, setContacts] = useState([])
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

    //Sacar del getContacts el username comparando el id con el id de los contactos
    const username = contacts.find((contact) => contact.id === parseInt(id))?.username
    console.log(username)



    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{username}</span>
                
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat