import { Avatar, Button, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modalcomments from './Modalcomments';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import FlagIcon from '@mui/icons-material/Flag';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ITEM_HEIGHT = 48;
const Comments = ({ comment }) => {

    const { id } = useParams(); //Trae el id de la url
    const tokenUser = localStorage.getItem('token') //Trae el token del usuario
    const [comments, setComments] = useState([]) //Estado para guardar los comentarios
    const [showComments, setShowComments] = useState({}) //Estado para mostrar los comentarios
    const [user, setUser] = useState([]) //Estado para traer 
    const [loading, setLoading] = useState(true);


    // Trae los comentarios por producto
    const getComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products/${id}/comments`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )

            setComments(response.data.data.comments.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Trae los comentarios
    const getCommentsShow = async (idcoms) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products/${id}/comments/${idcoms}`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )

            setShowComments(response.data.data.comments.data, idcoms);
            setLoading(false);

        } catch (error) {
            setLoading(false);

        }
    };

    // Trae el usuario
    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/profile`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            setUser(response.data.data.user.id);
            setLoading(false);


        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    }

    // Elimina el comentario
    const deleteComment = async (idcoms) => {
        setLoading(true);
        /* Hacer que la página se recargue cada vez que elimino un producto */

        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {

            try {
                const response = await axios.delete(
                    `https://offhouse.herokuapp.com/api/products/${id}/comments/${idcoms}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
                )
                getComments()
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    // Actualiza el comentario
    useEffect(() => {
        getComments()

        getUser()
    }, [])


    return (
        <div >
              {
                  loading ? (
                    <Box sx={{ display: 'flex', height: '30vh', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={80} sx={{ color: '#FF9901' }} />
                  </Box>  
                  )
                  :
                  (
            <Card sx={{ pl: 5, pt: 0, pr: 5 }}>
                <h2 id='labelprod3'>Comentarios</h2>
                <Divider />
                {

                    comments.map((comment, index) => (
                        <Grid sx={{ mt: 5 }}>
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
                                    <p id='labelprod3'>{comment.comment}</p>
                                </div>

                                <div style={{ display: 'flex', gap: '1%', marginBottom: '2%' }}>

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

                            </div>
                            <Divider />
                        </Grid>
                    ))

                }
            </Card>
                  )}
        </div>
    )
}

export default Comments