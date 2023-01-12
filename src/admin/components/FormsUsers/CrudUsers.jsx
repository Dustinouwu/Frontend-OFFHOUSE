import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';



const CrudUsers = () => {

  const navigate = useNavigate();  // Navegar entre rutas
  const [users, setUsers] = useState([])
  const tokenUser = localStorage.getItem('token')
  const [pageSize, setPageSize] = React.useState(10);
  const config = {
    headers: { Authorization: `${tokenUser}` }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/admin/customers',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      )
      setUsers(response.data.data.customers)
    } catch (error) {
      console.log(error.response.data.message, 'error');
    }
  }

  const deleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await axios.delete(
          `https://offhouse.herokuapp.com/api/admin/customers/${id}`,
          { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
          config
        )
        await getUsers();
      } catch (error) {
        console.log(error.response.data.message, 'error');
      }
    }
  }

  useEffect(() => {
    getUsers();

  }, []);

  const newDate = (date) => {
    const newDate = date.split('T')
    return newDate[0]
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'role_id', headerName: 'Rol Usuario', width: 100 },
    { field: 'username', headerName: 'Usuario', width: 250 },
    { field: 'first_name', headerName: 'Nombre', width: 200 },
    { field: 'last_name', headerName: 'Apellido', width: 200 },
    { field: 'state', headerName: 'Estado', width: 70 },
    { field: 'email', headerName: 'Correo', width: 250 },
    {
      field: 'email_verified_at', headerName: 'Fecha de verificación', width: 250,

    },
    {
      field: 'created_at', headerName: 'Fecha de Creación', width: 150,
      valueGetter: (params) => newDate(params.value)
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PersonSearchIcon />}
          label="View"
          onClick={() => navigate(`/formsUsers/view/${params.id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteUser(params.id)}
        />,
      ],
    },

  ];



  return (

    <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>

      <h1 id='labelhelp'>CRUD USUARIOS</h1>
      <DataGrid
        rows={users}
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

export default CrudUsers