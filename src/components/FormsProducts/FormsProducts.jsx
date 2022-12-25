import React from 'react'
import './FormsProducts.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
function createData(name) {
  return { name };
}

const rows = [
  createData('Frozen yoghurt'),
  createData('Ice cream sandwich'),
  createData('Eclair'),
  createData('Cupcake'),
  createData('Gingerbread'),
];

function FormsProducts() {
  return (
    <div>
      <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', marginBottom: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>
        <h1 id='labelhelp'>SUS PRODUCTOS</h1>
        <Link href="/createproduct" underline="none">
          <Button variant="contained" endIcon={<AddIcon style={{ backgroundColor: 'black', borderRadius: '10px' }} />} sx={{ mt: '1%', backgroundColor: '#000' }}>
            Subir un nuevo producto
          </Button>
        </Link>

        <TableContainer component={Paper} sx={{ mt: '1%', backgroundColor: '#BCB8B8' }}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell >Nombre de Producto</TableCell>

                <TableCell align="right" > </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell component="th" scope="row"  >
                    {row.name}
                  </TableCell>

                  <TableCell align="right" >
                    <ButtonGroup sx={{ gap: 0.5 }} orientation="vertical">
                      <Button variant="text" startIcon={<DeleteIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'red' }}>
                        Delete
                      </Button>
                      <Button variant="text" startIcon={<EditIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'green' }}>
                        Edit
                      </Button>
                    </ButtonGroup>



                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>

  )
}

export default FormsProducts