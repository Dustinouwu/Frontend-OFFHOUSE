import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'

const Input = ({ message }) => {

    const navigate = useNavigate(); //Redireccionar
    const { id } = useParams(); //Id del producto
    const tokenUser = localStorage.getItem('token')   //Token del usuario
    const [error, setError] = useState(false);  //Error
    console.log('idmensage:', id)
    const [form, setForm] = useState({
        to: message?.to ?? '',
        message: message?.message ?? '',
    });
    console.log('ID:', id)
    console.log('form', form)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    //Función para enviar el formulario
    const handleSubmit = useCallback(async (e) => {
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

            setForm({ message: '' });

        } catch (error) {
            console.log(error)

        }
    }, [ id, message]);

    //Función para enviar el formulario
    useEffect(() => {
        handleSubmit()

    }, [])


    return (
        <form onSubmit={handleSubmit}>
            <div className="input" >

                <input type="hidden" name="to" value={form.to = id} />
                <input
                    type="text"
                    placeholder="Type something..."
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />
                <div className="send">

                    <button>Send</button>
                </div>


            </div>
        </form>
    )
}

export default Input