import React from 'react'
import './Chat.css'
import TextField from '@mui/material/TextField';

export const Chat = () => {
  return (
    <div>
      <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%' }}>
        <div className="chat-container">
          <TextField
            id="outlined-read-only-input"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />

        </div>
      </div>
    </div>
  )
}

