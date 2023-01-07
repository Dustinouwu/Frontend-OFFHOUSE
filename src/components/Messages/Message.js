import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'
const Message = ({ message }) => {

    const { id } = useParams();
    const tokenUser = localStorage.getItem('token')
    const [messages, setMessages] = useState([])
    
    

    useEffect(() => {
        const getMessage = async () => {
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
        getMessage()
    }, [id])




    return (
        <div>

            {
                messages.map((message) => (
                    <div className='message'>
                        <div className="messageInfo" key={message.id} >
                            {
                                message.from != id // Si el id del remitente es el mismo que el id del usuario actual...
                                    ? (
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
                                    ) : (
                                        // Muestra el mensaje como si fuera del otro usuario
                                        <div>

                                            <img
                                                src='https://th.bing.com/th/id/R.d41a77c75100223a517263b60d4870e9?rik=zdMRVnghU8a69g&pid=ImgRaw&r=0'
                                                alt="qwe"
                                            />
                                            <div className="messageContent">

                                                <p>{message.message}</p>
                                                <span>just now</span>
                                            </div>
                                        </div>
                                    )
                            }
                            
                        </div>

                    </div >
                ))

            }
        </div>


    )
}

export default Message

{/* < div >
                                <div className="messageInfo" key={messages.id} >
                                    <img
                                        src='https://danzeria.com/wp-content/uploads/2014/09/Daft-Punk2-600x271.jpg'
                                        alt="qwe"
                                    />
                                    <span>just now</span>
                                </div>
                                <div className="messageContent">
                                    <p>{messages.message}</p>

                                </div>
                            </ > */}