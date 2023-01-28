import { Button, Grid, MenuItem, TextareaAutosize, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FlagIcon from '@mui/icons-material/Flag';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';

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

const ModalMessage = ({ message, product }) => {

    const navigate = useNavigate(); //Redireccionar
    const { id } = useParams(); //Id del producto
    const tokenUser = localStorage.getItem('token')   //Token del usuario
    const [open, setOpen] = React.useState(false);  //Abrir el modal
    const [openMessage, setOpenMessage] = React.useState(false);  //Abrir el modal 
    const [error, setError] = useState(false);  //Error


    //Funciones para abrir y cerrar el modal
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

    //Fomulario
    const [form, setForm] = useState({
        to: message?.to ?? '',
        message: message?.message ?? '',
    });
    
   

    //Función para cambiar el estado del formulario
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
            navigate(`/chats/${product?.user_id}`)
            setForm({ message: '' });
            handleClick();
            handleClose();
            handleCloseMessage();
        } catch (error) {
            console.log(error)

        }
    }, [tokenUser, form, id, navigate, message]);

    //Función para enviar el formulario
    useEffect(() => {
        handleSubmit()

    }, [])



    return (
        <div>
            <Button variant="text" onClick={handleOpen}  startIcon={<SendIcon style={{ color: 'white' }} />} style={{ color: 'white', fontWeight: 'bold', backgroundColor: '#FF9901', whiteSpace: 'nowrap' }}>
                CONTACTAR CON EL VENDEDOR
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ '& .MuiTextField-root': { ml: 0, mb: 2, width: '47ch' }, gap: '2%', ...style, width: 400, pr: 15 }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Ingrese el mensaje que quiere enviar</h2>
                        <Grid item xs={1}>
                            <input type="hidden" name="to" value={form.to=product?.user_id}  />
                            <TextField
                                id="filled-select-currency-native"
                                label="Mensaje"
                                name='message'
                                onChange={handleChange}
                                value={form.message}
                                select
                                InputLabelProps={{
                                    native: true,
                                }}
                            >
                                <MenuItem value={`Hola que tal, necesito información del producto "${product?.title}"`} selected>Hola que tal, necesito información del producto</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto está disponible">Hola, necesito saber si el producto está disponible</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto está en buen estado">Hola, necesito saber si el producto está en buen estado</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es original">Hola, necesito saber si el producto es original</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es nuevo">Hola, necesito saber si el producto es nuevo</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es usado">Hola, necesito saber si el producto es usado</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es de segunda mano">Hola, necesito saber si el producto es de segunda mano</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es de primera mano">Hola, necesito saber si el producto es de primera mano</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es de segunda">Hola, necesito saber si el producto es de segunda</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es de primera">Hola, necesito saber si el producto es de primera</MenuItem>
                                <MenuItem value="Hola, necesito saber si el producto es de segunda mano">Hola, necesito saber si el producto es de segunda mano</MenuItem>

                            </TextField>
                        </Grid>
                        <Button variant="contained" type='submit' onClick={handleClick} style={{backgroundColor: '#FF9901'}}>ENVIAR</Button>
                        <Snackbar open={openMessage}  >
                            <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                                Su mensaje ha sido enviado
                            </Alert>
                        </Snackbar>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}

export default ModalMessage