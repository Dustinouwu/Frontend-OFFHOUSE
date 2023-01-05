import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormsProfile from '../../components/Forms/FormsProfile/FormsProfile'

export const UpdateProfile = () => {

  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("token");
  const [profile, setProfile] = useState([])

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://offhouse.herokuapp.com/api/profile`,
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
      )
      const user = { ...response.data.data.user}
      setProfile(user);
      console.log('usuario', user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <div>
        {
          Object.keys(profile).length > 0 ? 
          (
            <FormsProfile profile={profile} />
          )
          :
          (
            <h1>CARGANDO ...</h1>
          )
        }
        

      </div>
    </div>
  )
}

