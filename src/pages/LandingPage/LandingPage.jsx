import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>

      <input onClick={() => navigate('/login')}></input>
    </div>
  )
}

 