import React from 'react'
import './index.css'
const Message = () => {
    return (
        <div
            
            className='message'
        >
            <div className="messageInfo">
                <img
                    src='https://danzeria.com/wp-content/uploads/2014/09/Daft-Punk2-600x271.jpg'
                    alt="qwe"
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hola como estas</p>
               
            </div>
        </div>
    )
}

export default Message