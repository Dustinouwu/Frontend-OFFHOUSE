import React from 'react'
import './index.css'
import Input from './Input'
import Messages from './Messages'
const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>MIGUEL</span>
                
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat