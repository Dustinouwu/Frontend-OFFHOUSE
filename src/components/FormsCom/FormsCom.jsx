import React from 'react'
import './FormsCom.css'
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
function createData(id, comment, userID, productID ) {
    return { id, comment, userID, productID  };
}

const rows = [
    createData(1, 'Frozen yoghurt', 1, 1),
    createData(2, 'Ice cream sandwich', 2, 2),
    createData(3, 'Eclair', 3, 3),
    createData(4, 'Cupcake', 4, 4),
    createData(5, 'Gingerbread', 5, 5),
];

function FormsCategories() {
    return (
        <div style={{marginLeft: '3%',marginRight: '3%',marginTop: '3%', paddingLeft:'3%',paddingRight:'3%',paddingBottom:'3%',paddingTop:'3%', borderRadius: '10px', backgroundColor: '#D9D9D9'}}>
            <h1 id='labelhelp'>CRUD COMENTARIOS</h1>
            <TableContainer component={Paper} sx={{ mt: '1%', backgroundColor: '#BCB8B8' }}>
                <Table  aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell  align="right"  >Nombre Categoría</TableCell>
                            <TableCell  align="right" >Comentario</TableCell>
                            <TableCell  align="right"  >ID USUARIO</TableCell>
                            <TableCell  align="right" >ID PRODUCTO</TableCell>
                            <TableCell  align="right" ></TableCell>
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
                                    {row.comment}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" >
                                    {row.userID}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" >
                                    {row.productID}
                                </TableCell>

                                <TableCell align="right" >
                                    <ButtonGroup sx={{ gap: 0.5 }} orientation="vertical">
                                        <Button variant="text" startIcon={<DeleteIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'red' }}>
                                            Delete
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