import React from 'react'
import './index.css'

const Input = () => {
    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                
            />
            <div className="send">
                
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input