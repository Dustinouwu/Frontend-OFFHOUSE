import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modalcomments from './Modalcomments';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import FlagIcon from '@mui/icons-material/Flag';





const Comments = ({ comment }) => {

    const { id } = useParams(); //Trae el id de la url
    const tokenUser = localStorage.getItem('token') //Trae el token del usuario
    const [comments, setComments] = useState([]) //Estado para guardar los comentarios
    const [showComments, setShowComments] = useState([]) //Estado para mostrar los comentarios
    const [user, setUser] = useState([]) //Estado para traer 

    // Trae los comentarios por producto
    const getComments = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products/${id}/comments`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )

            setComments(response.data.data.comments.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Trae los comentarios
    const getCommentsShow = async (idcoms) => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products/${id}/comments/${idcoms}`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )

            setShowComments(response.data.data.comments.data, idcoms);
            
        } catch (error) {
            
        }
    };

    // Trae el usuario
    const getUser = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user.id);


        } catch (error) {
            console.log(error);
        }
    }

    // Elimina el comentario
    const deleteComment = async (idcoms) => {
        /* Hacer que la página se recargue cada vez que elimino un producto */

        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {

            try {
                const response = await axios.delete(
                    `https://offhouse.herokuapp.com/api/products/${id}/comments/${idcoms}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                getComments()
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Actualiza el comentario
    useEffect(() => {
        getComments()
        getCommentsShow()
        getUser()
    }, [getCommentsShow])


    return (
        <div sty>
            <div style={{ display: 'flex', gap: '1%' }}>
                <Modalcomments />
                <ModalDelete />
            </div>

            <div style={{ border: '9px solid #FF9901', padding: '0% 2% 2% ', marginTop: '2%', backgroundColor: 'white', borderRadius: '35px' }}>
                {
                    comments.map((comment, index) => (
                        <div item key={comment.id}>
                            <h2 id='labelprod3'>{comment.user_name}</h2>
                            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                <Avatar
                                    id="avatar-header"
                                    alt={comment.user_name}
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 50, height: 50 }}
                                    overlap="circular"
                                />
                                <h2 id='labelprod2'>{comment.comment}</h2>
                            </div>
                            <div style={{ display: 'flex', gap: '1%' }}>
                                {
                                    user === comment.user_id ?
                                        <Button
                                            variant="text"
                                            startIcon={<RateReviewIcon style={{ color: 'white' }} />}
                                            style={{ color: 'white', backgroundColor: 'red' }}
                                            onClick={() => { deleteComment(comment.id) }}
                                        >
                                            ELIMINAR
                                        </Button>

                                        : null
                                }
                                {
                                    user === comment.user_id ?
                                        Object.keys(comment).length > 0 ?
                                            (
                                                <ModalEdit comment={comment} />
                                            )
                                            :
                                            (
                                                <h1>Loading...</h1>
                                            )


                                        : null
                                }
                            </div>
                            <div className='footer-lineseparator' style={{ marginTop: '1%', }}></div>
                        </div>
                    ))
                }


            </div>

        </div>
    )
}

export default Comments

