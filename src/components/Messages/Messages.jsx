import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const Messages = () => {

    const [contacts, setContacts] = useState([])
    const tokenUser = localStorage.getItem('token')
    const { id } = useParams()

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

    const showMessages = async () => {
        try {
            const response = await axios.post(
                `https://offhouse.herokuapp.com/api/user/${id}/messages`,
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

    return (
        <div>
            <div>
                <h1>CONTACTOS</h1>
                {
                    contacts.map((contact) => (
                        <div key={contact.id}>
                            <h3>Username: {contact.username}</h3>

                            <Link>
                                <button>Enviar mensaje</button>
                            </Link>


                        </div>
                    ))
                }
            </div>
            <div>
                <h1>MENSAJES</h1>

            </div>
        </div>
    )
}

export default Messages