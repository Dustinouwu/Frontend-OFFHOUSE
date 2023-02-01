import { Button, Grid, MenuItem, TextareaAutosize, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FlagIcon from '@mui/icons-material/Flag';
import Snackbar from '@mui/material/Snackbar';
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


const ModalDelete = ({ report }) => {

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
        title: report?.title ?? '',
        description: report?.description ?? '',
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
            console.log(report)

            await axios.post(
                `https://offhouse.herokuapp.com/api/products/${id}/reports`,
                { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }

            )
            handleClose();
            handleClick();


        } catch (error) {
            console.log(error)
        }
    }, [tokenUser, form, id, navigate, report]);

    //Función para enviar el formulario
    useEffect(() => {
        handleSubmit();
    }, [handleSubmit])




    return (
        <div>
            <Button
                variant="text"
                startIcon={<FlagIcon style={{ color: 'white' }} />}
                style={{ color: 'white', backgroundColor: 'red' }}
                onClick={handleOpen}
            /* Cuando haga click en este botón se tiene que abrir el modal */
            >
                REPORTAR
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ '& .MuiTextField-root': { ml: 0, mb: 2, width: '50ch' }, gap: '2%', ...style, width: 450, pr:10 }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Ingreso información sobre el reporte</h2>
                        <Grid item xs={1} sx={{width: 'auto'}}>
                            <TextField
                                id="filled-select-currency-native"
                                label="Motivo de reporte"
                                name='title'
                                onChange={handleChange}
                                value={form.title}
                                select
                                InputLabelProps={{
                                    native: true,
                                }}
                            >
                                <MenuItem value="Vende una copia o falsificación" selected>Vende una copia o falsificación</MenuItem>
                                <MenuItem value="El producto es ilegal">El producto es ilegal</MenuItem>
                                <MenuItem value="Quiere cobrar un precio diferente al de la publicación">Quiere cobrar un precio diferente al de la publicación </MenuItem>
                                <MenuItem value="Ofrece métodos de pagos no autorizados">Ofrece métodos de pagos no autorizados</MenuItem>
                                <MenuItem value="Tiene contenido ofensivo">Tiene contenido ofensivo</MenuItem>
                                <MenuItem value="Creo que es un intento de fraude">Creo que es un intento de fraude</MenuItem>
                                <MenuItem value="La información no corresponde al producto">La información no corresponde al producto</MenuItem>
                                <MenuItem value="Otro motivo">Otro motivo</MenuItem>

                            </TextField>
                        </Grid>
                        <TextareaAutosize
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                            aria-label="minimum height"
                            minRows={3}
                            style={{ width: 400, height: 100, marginBottom: 10 }}
                        />
                        <Button variant="contained" type='submit' onClick={handleClick} style={{backgroundColor: 'red'}}>ENVIAR</Button>
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

export default ModalDelete


