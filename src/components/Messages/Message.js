import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'
import Pusher from 'pusher-js'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const Message = () => {

    const { id } = useParams();
    const tokenUser = localStorage.getItem('token')
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState([])
    const [avatar, setAvatar] = useState([])
    const [error, setError] = useState(false);  //Error
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/profile',
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user, id)
            setAvatar(response.data.data.avatar)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const getMessage = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/user/${id}/messages`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setMessages(response.data.data.messages)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    )

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

    //Credenciales de Pusher
    useEffect(() => {
        //Colocar las credenciales de pusher
        Pusher.logToConsole = true;
        const pusher = new Pusher('8031fead247c518cc207', {
            cluster: 'us2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('messages', function (data) {
            setMessages([...messages, data])
        });

        getMessage()
        getUser();
        getContacts();
    }, [id])
    /*     console.log('FROM:', user.id)
        console.log('TO:', id) */


    /* const filteredMessages = () => {
        return messages.filter(message =>
            message.user === user.id || message.receiver === user.id
        );
    }; */

    //Sacar la fecha y hora de creacion del mensaje por cada mensaje y solo una sola vez sin que se repita
    const dateFormatedMessage = useMemo(() => {
        return messages.map((message) => {
            const date = new Date(message.created_at);
            const dateFormated = date.toLocaleString();
            return dateFormated;
        });
    }, [messages]);




    //Sacar el avatar del getContacts comparando el id del getContacts con el id del la ruta para sacar el avatar del contacto
    const avatarChat = useMemo(() => {
        return contacts.map((contact) => {
            if (contact.id === parseInt(id)) {
                return contact.avatar
            }
        });
    }, [contacts, id]);
    console.log(avatarChat)


    const username = contacts.find((contact) => contact.id === parseInt(id))?.avatar
    console.log(username)

    return (
        <div>
            {
                loading ? (
                    <Box sx={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                    </Box>
                ) : (
                    <div>
                        {
                            messages.map((message) => (
                                (message.from === user.id || message.to === user.id) ? (
                                    /* condicional para que los mensajes del remitente y del receptor tengan un formato diferente */
                                    (message.from === user.id) ? (
                                        <div className='messageContentOwner'>
                                            <div className="messageInfo" key={message.id}>
                                                <div>
                                                    <div className="messageContentOwner">
                                                        <img
                                                            src={avatar}
                                                            alt="qwe"
                                                        />
                                                        <p>{message.message}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    ) : (
                                        <div className='message'>
                                            <div className="messageInfo" key={message.id}>
                                                <div>
                                                    <div className="messageContent">
                                                        <img
                                                            src={username}
                                                            alt="qwe"
                                                        />
                                                        <p>{message.message}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    )
                                ) : (
                                    <h1></h1>
                                )
                            ))
                        }
                    </div>
                )
            }



        </div>

    )
}

export default Message


