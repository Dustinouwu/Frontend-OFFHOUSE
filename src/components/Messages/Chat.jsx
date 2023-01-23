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
            console.log(response.data.data.contacts)
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(() => {
        getContacts()
        
    }, [])

    //Sacar del getContacts el

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{}</span>
                
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat