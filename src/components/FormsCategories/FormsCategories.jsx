import React from 'react'
import './FormsCategories.css'
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

import AddIcon from '@mui/icons-material/Add';
function createData(id, name) {
    return { id, name };
}

const rows = [
    createData(1, 'Frozen yoghurt'),
    createData(2, 'Ice cream sandwich'),
    createData(3, 'Eclair'),
    createData(4, 'Cupcake'),
    createData(5, 'Gingerbread'),
];

function FormsCategories() {
    return (
        <div style={{marginLeft: '3%',marginRight: '3%',marginTop: '3%', paddingLeft:'3%',paddingRight:'3%',paddingBottom:'3%',paddingTop:'3%', borderRadius: '10px', backgroundColor: '#D9D9D9'}}>
            <h1 id='labelhelp'>CRUD CATEGORIAS</h1>
            <Button variant="contained" endIcon={<AddIcon style={{ backgroundColor: 'black', borderRadius: '10px' }} />} sx={{ mt: '1%' }}>
                Añadir categoria
            </Button>
            <TableContainer component={Paper} sx={{ mt: '1%', backgroundColor: '#BCB8B8' }}>
                <Table  aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell >Id</TableCell>
                            <TableCell  align="right"  >Nombre Categoría</TableCell>
                            <TableCell  align="right" > </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" >
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

    )
}

export default FormsCategories