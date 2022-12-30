import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Comments = () => {

    /* POR METODO GET COLOCAR LOS COMENTARIOS QUE TIENE EL PRODUCTO POR ID POR UNA API */


    const [comments, setComments] = useState([])
    const { id } = useParams();
    const tokenUser = localStorage.getItem('token')


    const getComments = async () => {
        try {
            const response = await axios.get(
                `https://offhouse.herokuapp.com/api/products/${id}/comments`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } }

            )
            console.log(response.data.data.comments.data);
            setComments(response.data.data.comments.data);


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments()
    }, [])





    return (
        <div>
            <div style={{ gap: '6%' }}>
                <Button variant="text" startIcon={<RateReviewIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'blue' }}>
                    Enviar Comentario
                </Button>
                <Button variant="text" startIcon={<RateReviewIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'red' }}>
                    Reportar
                </Button>
            </div>

            <div>
                {
                    comments.map((comment, index) => (
                        <div item key={comment.id}>
                            <div className='footer-lineseparator' style={{ marginTop: '1%' }}></div>
                            <h2>{comment.user_name}</h2>
                            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                <Avatar
                                    id="avatar-header"
                                    alt={comment.user_name}
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 60, height: 60 }}
                                    overlap="circular"
                                />
                                <h2>{comment.comment}</h2>
                            </div>
                            <div className='footer-lineseparator' style={{ marginTop: '1%' }}></div>

                        </div>
                    ))
                }


            </div>

        </div>
    )
}

export default Comments

{/* <div className='footer-lineseparator' style={{ marginTop: '1%' }}></div>
                <h2>{comments.user_id}</h2>
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Avatar
                        id="avatar-header"
                        alt='ola'
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 60, height: 60 }}
                        overlap="circular"
                    />
                    <h2>{comments.comment}</h2>
                </div> */}