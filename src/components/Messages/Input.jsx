import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'

const Input = () => {

    const navigate = useNavigate(); //Redireccionar
    const { id } = useParams(); //Id del producto
    const tokenUser = localStorage.getItem('token')   //Token del usuario
    const [error, setError] = useState(false);  //Error
    const [message, setMessage] = useState(''); //Mensajes
    const [form, setForm] = useState({
        to: message?.to ?? '',
        message: message?.message ?? '',
    });
    
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    
    //Función para enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes('')) {
            setError(true);
            console.log('error')
            setTimeout(() => {
                setError(false);
            }, 3000);

            return;
        }
        try {
            console.log(message)
            await axios.post(
                `https://offhouse.herokuapp.com/api/user/send`,
                { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setForm({ message: '', to: ''});
    
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="input" >

                <input type="hidden" name="to" value={form.to = id} />
                <input
                    type="text"
                    placeholder="Escriba algo..."
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />
                <div className="send">

                    <button>Enviar</button>
                </div>


            </div>
        </form>
    )
}

export default Input