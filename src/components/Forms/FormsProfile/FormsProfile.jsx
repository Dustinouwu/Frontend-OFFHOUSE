import React, { useState } from 'react'
import './FormsProfile.css'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
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
  const [form, setForm] = useState({
    username: profile?.username ?? '',
    first_name: profile?.first_name ?? '',
    last_name: profile?.last_name ?? '',
    email: profile?.email ?? '',
    home_phone: profile?.home_phone ?? '',
    personal_phone: profile?.personal_phone ?? '',
    address: profile?.address ?? '',
  });

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).includes('')) {
      console.log('error');
      setError(true);
      return;
    }

    try {
      await axios.post(
        `https://offhouse.herokuapp.com/api/profile`,
        { ...form }, { headers: { 'accept': 'application/json', 'authorization': tokenUser } }
      );
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }



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
              <label className="label-error-createu">
                {error}
              </label>
            }

            <Grid container spacing={3} >
              <Grid item xs={12} >
                <TextField
                  id="role_id"
                  name="username"
                  label="Nombre de usuario"
                  value={form.username}
                  onChange={handleForm}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  name='first_name'
                  label="Nombre"
                  onChange={handleForm}
                  value={form.first_name}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  name="last_name"
                  label="Apellido"
                  value={form.last_name}
                  onChange={handleForm}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="username"
                  name="email"
                  type="email"
                  label="Email"
                  value={form.email}
                  onChange={handleForm}
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="username"
                  label="Teléfono"
                  name='home_phone'
                  type='number'
                  fullWidth
                  onChange={handleForm}
                  value={form.home_phone}
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={handleForm}
                  value={form.personal_phone}
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                </TextField>
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="username"
                  label="Dirección"
                  name='address'
                  fullWidth
                  value={form.address}
                  onChange={handleForm}
                  autoComplete="shipping address-line2"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
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