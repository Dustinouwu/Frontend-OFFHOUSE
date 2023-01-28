import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const styles = {
  width: 'fit-content',
  height: '20%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  marginTop: '10px',
  marginBottom: '10px',
  borderRadius: '20px',


}
const CrudSubscription = () => {

  const navigate = useNavigate();  // Navegar entre rutas
  const [subs, setSubs] = useState([])
  const tokenUser = localStorage.getItem('token')
  const [pageSize, setPageSize] = React.useState(10);
  const config = {
    headers: { Authorization: `${tokenUser}` }
  };

  const getSubs = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/admin/subscriptions',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      )
      setSubs(response.data.data.subscriptions)
      console.log(response.data.data.subscriptions, 'subs');
    } catch (error) {
      console.log(error.response.data.message, 'error');
    }
  }

  const changeStatus = (status) => {
    if (status === 'active') {
      return <Alert severity="success" variant="outlined" sx={styles}>Activo</Alert>
    } else if (status === 'expired') {
      return <Alert severity="warning" variant="outlined" sx={styles}>Expirado</Alert>
    } else if (status === 'canceled') {
      return <Alert severity="error" variant="outlined" sx={styles}>Cancelado</Alert>
    }
  }

  // cambiar el estado inactivo a activo y viceversa 
  const changeStatusSub = async (id) => {
    if (window.confirm('¿Desea cambiar el estado de la suscripción?')) {
      try {
        const response = await axios.post(
          `https://offhouse.herokuapp.com/api/admin/subscriptions/${id}/cancel`,
          { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
          config
        )
        console.log(response.data.message, 'response');
        getSubs()
      } catch (error) {
        console.log(error.response.data.message, 'error');
      }
    }
  }

  const acceptSub = async (id) => {
    if (window.confirm('¿Desea aceptar la suscripción?')) {
      try {
        const response = await axios.post(
          `https://offhouse.herokuapp.com/api/admin/subscriptions/${id}`,
          { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
          config
        )
        console.log(response.data.message, 'response');
        getSubs()
      } catch (error) {
        console.log(error.response.data.message, 'error');
      }
    }
  }

  useEffect(() => {
    getSubs();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'status', headerName: 'Estado', width: 200, renderCell: (params) => changeStatus(params.value) },
    { field: 'payment_method', headerName: 'Método de pago', width: 160 },
    { field: 'start_date', headerName: 'Fecha de inicio', width: 150 },
    { field: 'end_date', headerName: 'Fecha de culminación', width: 150 },
    { field: 'price', headerName: 'Precio', width: 70 },
    { field: 'user_id', headerName: 'ID Usuario', width: 100 },
    { field: 'product_id', headerName: 'ID Producto', width: 100 },
    { field: 'created_at', headerName: 'Fecha de creación', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DoDisturbOffIcon />}
          label="Delete"
          onClick={() => {
            changeStatusSub(params.id)
          }}
        />,
        <GridActionsCellItem
          icon={<DoneAllIcon />}
          label="Delete"
          onClick={() => {
            acceptSub(params.id)
          }}
        />,

      ],
    },

  ];



  return (

    <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>

      <h1 id='labelhelp'>CRUD SUSCRIPCIONES</h1>
      <DataGrid
        rows={subs}
        columns={columns}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        sx={{ height: '650px', border: '1px solid white', backgroundColor: '#BCB8B8' }}
      >
      </DataGrid>

    </div>

  );
}

export default CrudSubscription