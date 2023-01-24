import React from 'react';
import './index.css';
import Chats from './Chats';
import Search from './Search';
import Navbar from './Navbar';
const Sidebar = () => {
    return (
      <div className="sidebar">
        <Navbar />
        <Chats />
        
      </div>
    );
  };

export default Sidebar;
