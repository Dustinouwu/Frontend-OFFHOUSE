import React, { useEffect, useState } from 'react'
import './Chatting.css'
import Pusher from 'pusher-js'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const Chatting = () => {

    const { id } = useParams();
    const tokenUser = localStorage.getItem('token')
    const [username, setUsername] = useState(id)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    let allMessages = []
    console.log('dark',username)

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('ce70af3d29d33f7d5525', {
            cluster: 'us2'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {
            allMessages.push(data)
            setMessages(allMessages)
        });
    }, [])


    const submitMessage = async(e) => {
        e.preventDefault();
        try {
            await axios.post(
                'https://offhouse.herokuapp.com/api/user/send',
                { username, message },
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
        }
        catch (error) {
            console.log(error)
        }
        
    }


    return (
        <div className="containera">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div
                    className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="fs-5 fw-semibold"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea">
                    {messages.map(message => {
                        return (
                            <div className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <form onSubmit={messages}>
                <input className="form-control" placeholder="Write a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </div >
    );

}

export default Chatting