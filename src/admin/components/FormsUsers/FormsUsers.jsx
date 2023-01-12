import React, { useEffect, useState } from 'react'
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
import ReactPaginate from 'react-paginate';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';



export default function DataTable() {

  const navigate = useNavigate();  // Navegar entre rutas
  const [reports, setReports] = useState([]);  // Listar categorias
  const tokenUser = localStorage.getItem('token')

  const config = {
    headers: { Authorization: `${tokenUser}` }
  };

  const getReports = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/admin/reports',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      )
      setReports(response.data.data.reports)
    } catch (error) {

    }
  }

  const deleteReport = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
      try {
        await axios.delete(
          `https://offhouse.herokuapp.com/api/admin/reports/${id}`,
          { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
          config
        )
        await getReports();
      } catch (error) {
        console.log(error.response.data.message, 'error');
      }
    }
  }

  useEffect(() => {
    getReports();

  }, []);
  const newDate = (date) => {
    const newDate = date.split('T')
    return newDate[0]
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Motivo de Reporte', width: 300 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'state', headerName: 'Estado', width: 130 },
    { field: 'product_id', headerName: 'ID producto', width: 130 },
    {
      field: 'created_at', headerName: 'Fecha de creación', width: 130,
      valueGetter: (params) => newDate(params.value)
    },
    {
      field: '',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteReport(params.id)}
        />,
      ],
    },

  ];
  const [pageSize, setPageSize] = React.useState(10);


  return (

    <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>

      <h1 id='labelhelp'>CRUD REPORTS</h1>
      <DataGrid
        rows={reports}
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