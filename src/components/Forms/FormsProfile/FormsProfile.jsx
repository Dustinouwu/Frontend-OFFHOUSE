import React, { useEffect, useState } from 'react'
import './FormsProfile.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

const FormsProfile = ({ profile }) => {

  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("token");
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [home_phone, setHome_phone] = useState('');
  const [personal_phone, setPersonal_phone] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    home_phone: '',
    personal_phone: '',
    address: '',
  })

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    home_phone: '',
    personal_phone: '',
    address: '',
  })


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('home_phone', home_phone);
    formData.append('personal_phone', personal_phone);
    formData.append('address', address);

    try {
      await axios.post(
        `https://offhouse.herokuapp.com/api/profile`,
        formData, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
      );
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    setUsername(profile.username)
    setFirst_name(profile.first_name)
    setLast_name(profile.last_name)
    setEmail(profile.email)
    setHome_phone(profile.home_phone)
    setPersonal_phone(profile.personal_phone)
    setAddress(profile.address)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 10 }}>
            Editar tu perfil
          </Typography>

          <form onSubmit={handleSubmit}>
            {error &&

              <Alert severity="error" sx={{ mb: '3%' }}>Llene todos los campos!</Alert>
            }

            <Grid container spacing={3} >
              <Grid item xs={12} >
                <TextField
                  id="role_id"
                  name="username"
                  label="Nombre de usuario"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value)
                    if (event.target.value.length > 50) {
                      setErrors({ ...errors, username: true });
                      setErrorMessages({ ...errorMessages, username: 'No más de 25 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, username: true });
                      setErrorMessages({ ...errorMessages, username: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, username: false });
                      setErrorMessages({ ...errorMessages, username: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, username: true });
                      setErrorMessages({ ...errorMessages, username: 'Este campo es obligatorio' });
                    }
                  }}

                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.username}
                  helperText={errorMessages.username}

                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  name='first_name'
                  label="Nombre"
                  value={first_name}
                  onChange={(event) => {
                    setFirst_name(event.target.value)
                    if (event.target.value.length > 25) {
                      setErrors({ ...errors, first_name: true });
                      setErrorMessages({ ...errorMessages, first_name: 'No más de 25 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, first_name: true });
                      setErrorMessages({ ...errorMessages, first_name: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, first_name: false });
                      setErrorMessages({ ...errorMessages, first_name: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, first_name: true });
                      setErrorMessages({ ...errorMessages, first_name: 'Este campo es obligatorio' });
                    }
                  }}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.first_name}
                  helperText={errorMessages.first_name}
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  name="last_name"
                  label="Apellido"
                  value={last_name}
                  onChange={(event) => {
                    setLast_name(event.target.value)
                    if (event.target.value.length > 25) {
                      setErrors({ ...errors, last_name: true });
                      setErrorMessages({ ...errorMessages, last_name: 'No más de 25 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, last_name: true });
                      setErrorMessages({ ...errorMessages, last_name: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, last_name: false });
                      setErrorMessages({ ...errorMessages, last_name: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, last_name: true });
                      setErrorMessages({ ...errorMessages, last_name: 'Este campo es obligatorio' });
                    }
                  }}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.last_name}
                  helperText={errorMessages.last_name}

                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="username"
                  name="email"
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (event.target.value.length > 30) {
                      setErrors({ ...errors, email: true });
                      setErrorMessages({ ...errorMessages, email: 'No más de 30 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, email: true });
                      setErrorMessages({ ...errorMessages, email: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, email: false });
                      setErrorMessages({ ...errorMessages, email: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, email: true });
                      setErrorMessages({ ...errorMessages, email: 'Este campo es obligatorio' });
                    }
                  }}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.email}
                  helperText={errorMessages.email}

                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  label="Teléfono"
                  name='home_phone'
                  type='number'
                  fullWidth
                  onChange={(event) => {
                    setHome_phone(event.target.value)
                    if (event.target.value.length > 10) {
                      setErrors({ ...errors, home_phone: true });
                      setErrorMessages({ ...errorMessages, home_phone: 'No más de 10 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, home_phone: true });
                      setErrorMessages({ ...errorMessages, home_phone: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, home_phone: false });
                      setErrorMessages({ ...errorMessages, home_phone: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, home_phone: true });
                      setErrorMessages({ ...errorMessages, home_phone: 'Este campo es obligatorio' });
                    }
                  }}
                  value={home_phone}
                  autoComplete="shipping address-line2"
                  required
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.home_phone}
                  helperText={errorMessages.home_phone}
                >
                </TextField>
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  label="Celular"
                  name='personal_phone'
                  type='number'
                  fullWidth
                  onChange={(event) => {
                    setPersonal_phone(event.target.value)
                    if (event.target.value.length > 15) {
                      setErrors({ ...errors, personal_phone: true });
                      setErrorMessages({ ...errorMessages, personal_phone: 'No más de 15 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, personal_phone: true });
                      setErrorMessages({ ...errorMessages, personal_phone: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, personal_phone: false });
                      setErrorMessages({ ...errorMessages, personal_phone: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, personal_phone: true });
                      setErrorMessages({ ...errorMessages, personal_phone: 'Este campo es obligatorio' });
                    }
                  }}
                  value={personal_phone}
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.personal_phone}
                  helperText={errorMessages.personal_phone}
                >
                </TextField>
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="username"
                  label="Dirección"
                  name='address'
                  fullWidth
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value)
                    if (event.target.value.length > 15) {
                      setErrors({ ...errors, address: true });
                      setErrorMessages({ ...errorMessages, address: 'No más de 15 caracteres' })
                    } else if (event.target.value.length < 5) {
                      setErrors({ ...errors, address: true });
                      setErrorMessages({ ...errorMessages, address: 'No menos de 5 caracteres' })
                    } else {
                      setErrors({ ...errors, address: false });
                      setErrorMessages({ ...errorMessages, address: '' })
                    }
                  }}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      setErrors({ ...errors, address: true });
                      setErrorMessages({ ...errorMessages, address: 'Este campo es obligatorio' });
                    }
                  }}
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.address}
                  helperText={errorMessages.address}

                >
                </TextField>
              </Grid>
              <Grid item xs={6} >
                <Button
                  variant="contained"
                  sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  Confirmar
                </Button>

              </Grid>
              <Grid item xs={6} >
                <Button
                  variant="contained"
                  sx={{ mt: '1%', backgroundColor: '#000', alignItems: 'center' }}
                  onClick={() => navigate('/profile')}
                >
                  Cancelar
                </Button>

              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>

  )
}

export default FormsProfile





/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', marginBottom: '5%' }}>

      <div className="profile-container">
        
              <form className="formlogin" onSubmit={handleSubmit} >
                
                <Labelgiant text={"MI PERFIL"}></Labelgiant>

                <Label
                  text='USUARIO'
                />

                <input
                  id="user"
                  type='text'
                  name='username'
                  className="inputstyle"
                  value={form.username}
                  onChange={handleForm}
                  required

                >
                </input>

                <Label
                  text='NOMBRE'
                />

                <input
                  id="user"
                  type='text'
                  name='first_name'
                  value={form.first_name}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='APELLIDO'
                />

                <input
                  id="email"
                  type='text'
                  name='last_name'
                  value={form.last_name}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='EMAIL'
                />

                <input
                  id="email"
                  type='text'
                  name='email'
                  value={form.email}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='TELÉFONO'
                />

                <input
                  id="email"
                  type='number'
                  name='home_phone'
                  value={form.home_phone}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='CELULAR'
                />

                <input
                  id="email"
                  type='number'
                  name='personal_phone'
                  value={form.personal_phone}

                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>

                <Label
                  text='DIRECCIÓN'
                />

                <input
                  id="email"
                  type='text'
                  name='address'
                  value={form.address}
                  className="inputstyle"
                  onChange={handleForm}
                >
                </input>



                <div className="submit-button-container">
                  <button>LOGIN </button>
                </div>




              </form>


      </div>




    </div> */