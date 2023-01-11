import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'
import Pusher from 'pusher-js'
const Message = () => {

    const { id } = useParams();
    const tokenUser = localStorage.getItem('token')
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState([])
    const [error, setError] = useState(false);  //Error
    const [hasLoadedMessages, setHasLoadedMessages] = useState(false);

    const getUser = async () => {

        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/profile',
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user, id)
            console.log(response.data.data.user, id)
        } catch (error) {

        }
    }


    const getMessage = useCallback( async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/user/${id}/messages`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setMessages(response.data.data.messages)
        } catch (error) {
            console.log(error)
        }
    }
        )
    

    useEffect(() => {

        Pusher.logToConsole = true;
        const pusher = new Pusher('ce70af3d29d33f7d5525', {
            cluster: 'us2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('messages', function (data) {
            setMessages([...messages, data])


            console.log(setMessages)
        });
        
        getMessage()
        getUser();
    }, [id])
    console.log('FROM:',user.id)
    console.log('TO:',id)


    /* const filteredMessages = () => {
        return messages.filter(message =>
            message.user === user.id || message.receiver === user.id
        );
    }; */

    return (
        <div>
            <div>
                {
                    messages.map((message) => (
                        (message.from === user.id || message.to === user.id)? (
                        <div className='message'>
                            <div className="messageInfo" key={message.id}>
                                <div>
                                    <div className="messageContentOwner">
                                        <img
                                            src='https://danzeria.com/wp-content/uploads/2014/09/Daft-Punk2-600x271.jpg'
                                            alt="qwe"
                                        />
                                        <p>{message.message}</p>
                                        <span>just now</span>
                                    </div>
                                </div>
                            </div>
                        </div >
                        ) : (
                            <h1></h1>
                        )
                    ))
                }
            </div>


        </div>

    )
}

export default Message


