import { Button, Snackbar, TextareaAutosize } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
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

const Modalcomments = ({ comment }) => {

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
    comment: comment?.comment ?? '',
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
      console.log(comment)

      await axios.post(
        `https://offhouse.herokuapp.com/api/products/${id}/comments`,
        { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }

      )
      navigate(`/viewproduct/${id}`)
      window.location.href = `/viewproduct/${id}`;
      setForm({ comment: '' });
      handleClick();
      handleClose();
      handleCloseMessage();
    } catch (error) {
      console.log(error)
      
    }
  }, [tokenUser, form, id, navigate, comment]);

  //Función para enviar el formulario
  useEffect(() => {
    handleSubmit()

  }, [])



  return (
    <div>
      <Button variant="text" onClick={handleOpen} startIcon={<RateReviewIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: '#5CA637', whiteSpace: 'nowrap' }}>
        Enviar Comentario
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 400, [`@media (max-width: 485px)`]: { width: 300 }, [`@media (max-width: 380px)`]: { width: 300 } }}>
          <form onSubmit={handleSubmit}>
            <h2>Ingrese su comentario</h2>
            <TextareaAutosize
              name="comment"
              value={form.comment}
              onChange={handleChange}
              aria-label="minimum height"
              minRows={3}

              style={{ width: 320, height: 100, marginBottom: 10}}
              
            />
            <Button variant="contained"  onClick={handleClick} type='submit' >Enviar comentario</Button>
            <Snackbar open={openMessage}  >
              <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                Su comentario ha sido enviado
              </Alert>
            </Snackbar>
          </form>


        </Box>
      </Modal>
    </div >
  )
}

export default Modalcomments