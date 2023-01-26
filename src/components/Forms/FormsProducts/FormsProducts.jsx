import './FormsProducts.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../Layouts/Footer/Footer';

const FormsProducts = () => {

  const navigate = useNavigate(); /* FUNCIÓN PÁRA NAVEGAR */
  const [products, setProducts] = useState([]);  /* FUNCIÓN PARA LISTAR LOS PRODUCTOS */
  const tokenUser = localStorage.getItem('token')  /* FUNCIÓN PARA PODER RECUPERAR EL TOKEN */
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const config = {
    headers: { Authorization: `${tokenUser}` }
  };

  /* MUESTRA DE PRODUCTO POR USUARIO  */
  const getProductsUser = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/products',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      );
      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error.response.data.message, 'error');
    }
  };

  /* ELIMINACIÓN DE PRODUCTOS */
  const deleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await axios.delete(
          `https://offhouse.herokuapp.com/api/products/${id}`,
          { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
          config,
        );
        await getProductsUser();
        console.log(response.data.data.products.data);
      } catch (error) {
        console.log(error);
      }
    }
  };


  /* FUNCIÓN PARA RENDERIZAR AL CARGAR LA PÁGINA*/
  useEffect(() => {
    getProductsUser();

  }, []);

  //Filtro de productos por usuario
  const filterProducts = products.filter((product) => product.user_id === user.id);



  return (
    <div>
      <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', marginBottom: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 id='labelhelp'>MIS PRODUCTOS</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <Link href="/createproduct" underline="none">
            <Button variant="contained" endIcon={<AddIcon style={{ backgroundColor: 'black', borderRadius: '10px' }} />} sx={{ mt: '1%', backgroundColor: '#000' }}>
              Subir un nuevo producto
            </Button>
          </Link>
          <Link href="/productsprimium" underline="none">
            <Button variant="contained" endIcon={<WorkspacePremiumIcon style={{ backgroundColor: 'black', borderRadius: '10px' }} />} sx={{ mt: '1%', backgroundColor: '#000' }}>
              Mis productos premium
            </Button>
          </Link>
        </div>

        <TableContainer component={Paper} sx={{ mt: '1%', backgroundColor: '#BCB8B8' }}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell >Nombre de Producto</TableCell>
                <TableCell >Imagen</TableCell>
                <TableCell align="right" > </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProducts.map((products, index) => (
                <TableRow
                  key={products.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell component="th" scope="row"  >
                    {products.title}
                  </TableCell>
                  <TableCell component="th" scope="row"  >
                    <img src={products.image} alt="imagen" style={{ width: '100px', height: '100px' }} />
                  </TableCell>

                  <TableCell align="right" >
                    <ButtonGroup sx={{ gap: 0.5 }} orientation="vertical">
                      <Button
                        variant="text"
                        startIcon={<DeleteIcon style={{ color: 'white' }} />}
                        style={{ color: 'white', backgroundColor: 'red' }}
                        onClick={() => { deleteProduct(products.id) }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="text"
                        startIcon={<EditIcon style={{ color: 'white' }} />}
                        style={{ color: 'white', backgroundColor: 'green' }}
                        onClick={() => navigate(`/CreateProduct/edit/${products.id}`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="text"
                        startIcon={<WorkspacePremiumIcon style={{ color: 'white' }} />}
                        style={{ color: 'white', backgroundColor: 'blue' }}
                        onClick={() => navigate(`/payment/product/${products.id}`)}
                      >
                        Subscripción
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>

  )
}

export default FormsProducts