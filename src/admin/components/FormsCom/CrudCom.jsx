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
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CrudCom = () => {

    const navigate = useNavigate();  // Navegar entre rutas
    const [comments, setComments] = useState([]);  // Listar categorias
    const tokenUser = localStorage.getItem('token')

    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    const getComment = async () => {
        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/admin/comments',
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
                config
            )
            setComments(response.data.data.comments)
            console.log(response.data.data.comments, 'comentarios')
        } catch (error) {
            console.log(error.response.data.message, 'error');
        }
    }

    const deleteComment = async (id) => {
       if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        try {
            await axios.delete(
                `https://offhouse.herokuapp.com/api/admin/comments/${id}`,
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
                config
            )
            await getComment();
        }catch (error) {
            console.log(error.response.data.message, 'error');
        }

       }
    }

    useEffect(() => {
        getComment()
    }, [])

    return (
        <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>
            <h1 id='labelhelp'>CRUD COMENTARIOS</h1>
            <TableContainer component={Paper} sx={{ mt: '1%', backgroundColor: '#BCB8B8' }}>
                <Table aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell >ID</TableCell>
                            <TableCell align="right" >Comentario</TableCell>
                            <TableCell align="right"  >ID Usuario</TableCell>
                            <TableCell align="right" >ID Producto</TableCell>
                            <TableCell align="right" ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" >
                                    {row.comment}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" >
                                    {row.user_id}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" >
                                    {row.product_id}
                                </TableCell>

                                <TableCell align="right" >
                                    <ButtonGroup sx={{ gap: 0.5 }} orientation="vertical">
                                        <Button 
                                        variant="text" 
                                        startIcon={<DeleteIcon style={{ color: 'white' }} />} 
                                        style={{ color: 'white', backgroundColor: 'red' }}
                                        onClick={() => deleteComment(row.id)}
                                        >
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

export default CrudCom