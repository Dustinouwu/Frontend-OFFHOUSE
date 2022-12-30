import { Avatar, Button, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

const Modalcomments = ({ comment }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const tokenUser = localStorage.getItem('token')
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

      await axios.post(
        `https://offhouse.herokuapp.com/api/products/${id}/comments`,
        { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }

      )
      navigate(`/viewproduct/${id}`)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    handleSubmit()
  }, [])







  return (
    <div>
      <Button variant="text" onClick={handleOpen} startIcon={<RateReviewIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'blue' }}>
        Enviar Comentario
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
            <Button variant="contained" type='submit' >Contained</Button>
          </form>


        </Box>
      </Modal>
    </div>
  )
}

export default Modalcomments