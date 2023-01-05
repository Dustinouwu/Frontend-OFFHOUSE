import React, { useEffect, useState } from 'react'
import './FormsProfile.css'

import Label from "../../atoms/Label/Label";
import Labelgiant from "../../atoms/Labelgiant/Labelgiant";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const FormsProfile = ({ profile }) => {

  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("token");

  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    username: profile?.username ?? '',
    first_name: profile?.first_name ?? '',
    last_name: profile?.last_name ?? '',
    email: profile?.email ?? '',
    home_phone: profile?.home_phone ?? '',
    personal_phone: profile?.personal_phone ?? '',
    address: profile?.address ?? '',
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).includes('')){
      console.log('error');
      setError(true);
      return;
    }

    try {
      await axios.post(
        `https://offhouse.herokuapp.com/api/profile`,
        { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
      );
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', marginBottom: '5%' }}>

      <div className="profile-container">
        
              <form className="formlogin" onSubmit={handleSubmit} >
                
                <Labelgiant text={"MI PERFIL"}></Labelgiant>

                <Label
                  text='USUARIO'
                />

                <input
                  id="user"
                  type='text'
                  name='username'
                  className="inputstyle"
                  value={form.username}
                  onChange={handleForm}
                  required

                >
                </input>

                <Label
                  text='NOMBRE'
                />

                <input
                  id="user"
                  type='text'
                  name='first_name'
                  value={form.first_name}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='APELLIDO'
                />

                <input
                  id="email"
                  type='text'
                  name='last_name'
                  value={form.last_name}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='EMAIL'
                />

                <input
                  id="email"
                  type='text'
                  name='email'
                  value={form.email}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='TELÉFONO'
                />

                <input
                  id="email"
                  type='number'
                  name='home_phone'
                  value={form.home_phone}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='CELULAR'
                />

                <input
                  id="email"
                  type='number'
                  name='personal_phone'
                  value={form.personal_phone}

                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='DIRECCIÓN'
                />

                <input
                  id="email"
                  type='text'
                  name='address'
                  value={form.address}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>



                <div className="submit-button-container">
                  <button>LOGIN </button>
                </div>




              </form>


      </div>




    </div>

  )
}

export default FormsProfile