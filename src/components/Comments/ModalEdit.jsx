import { Button, Snackbar, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ModalEdit = ({ comment }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        setOpenMessage(true);
    };
    
    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
        
    };

    const tokenUser = localStorage.getItem('token')
    const [openMessage, setOpenMessage] = React.useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        comment: comment?.comment ?? '',
    });

    const { id } = useParams();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

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
            console.log(comment)
            await axios.put(
                `https://offhouse.herokuapp.com/api/products/${id}/comments/${comment.id}`,
                { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
            )
            /* window.location.href = `/viewproduct/${id}`; */
            handleClose();
            handleClick();
        } catch (error) {
            console.log(error)
        }
    };

    //Función para enviar el formulario
    useEffect(() => {
        handleSubmit();
    }, [handleSubmit])






    return (
        <div>
            <Button
                variant="text"
                startIcon={<RateReviewIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: '#5CA637' }}
                onClick={handleOpen}
            /* Cuando haga click en este botón se tiene que abrir el modal */
            >
                EDITAR
            </Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={{ ...style, width: 400 }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Ingrese su comentario</h2>
                        <TextareaAutosize
                            name="comment"
                            value={form.comment}
                            onChange={handleChange}
                            aria-label="minimum height"
                            minRows={3}

                            style={{ width: 400, height: 100, marginBottom: 10 }}
                        />
                        <Button variant="contained" onClick={handleClick}  type='submit' >Contained</Button>
                        <Snackbar open={openMessage}  >
                            <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                                Su reporte ha sido enviado
                            </Alert>
                        </Snackbar>
                    </form>


                </Box>
            </Modal>
        </div>
    )
}

export default ModalEdit