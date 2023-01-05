import React from 'react'
import './Chats.css'
import Sidebar from '../../components/Messages/Sidebar';
import Chat from '../../components/Messages/Chat';
export const Chats = () => {


  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

