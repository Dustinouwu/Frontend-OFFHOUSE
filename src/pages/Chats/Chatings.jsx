import React from 'react'
import Sidebar from '../../components/Messages/Sidebar';
import Chat from '../../components/Messages/Chat';

export const Chatings = () => {
    return (
        <div className='home'>
            <div className='container'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

