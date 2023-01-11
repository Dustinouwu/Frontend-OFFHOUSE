import React, { useEffect, useState } from 'react'
import './FormsCategories.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const CrudCategories = () => {

    const navigate = useNavigate();  // Navegar entre rutas
    const [categories, setCategories] = useState([]);  // Listar categorias
    const tokenUser = localStorage.getItem('token')

    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    // Muestra de categorias por usuario
    const getCategoriesUser = async () => {
        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/admin/categories',
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
                config
            )
            setCategories(response.data.data.categories)
            console.log(response.data.data.categories, 'categorias')
        } catch (error) {
            console.log(error.response.data.message, 'error');
        }
    }

    useEffect(() => {
        getCategoriesUser();

    }, []);



    return (
        <>

            <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>
                <h1 id='labelhelp'>CRUD CATEGORIAS</h1>
                <Button variant="contained" endIcon={<AddIcon style={{ backgroundColor: 'black', borderRadius: '10px' }} />} sx={{ mt: '1%' }} onClick={() => navigate(`/formsCategories`)}>
                    Añadir categoria
                </Button>
                <TableContainer component={Paper} sx={{ mt: '1%', backgroundColor: '#BCB8B8' }}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell >Id</TableCell>
                                <TableCell align="right"  >Nombre Categoría</TableCell>
                                <TableCell align="right" >Imagen </TableCell>
                                <TableCell align="right" > </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((categories) => (
                                <TableRow
                                    key={categories.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" >
                                        {categories.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right" >
                                        {categories.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right" >
                                        <img src={categories.image} alt="" style={{ width: '50px', height: '50px' }} />
                                    </TableCell>

                                    <TableCell align="right" >
                                        <ButtonGroup sx={{ gap: 0.5 }} orientation="vertical">
                                            {/* <Button variant="text" startIcon={<DeleteIcon style={{ color: 'white' }} />} style={{ color: 'white', backgroundColor: 'red' }}>
                                                Delete
                                            </Button> */}
                                            <Button
                                                variant="text"
                                                startIcon={<EditIcon style={{ color: 'white' }} />}
                                                style={{ color: 'white', backgroundColor: 'green' }}
                                                onClick={() => navigate(`/updateCategories/edit/${categories.id}`)}
                                            >

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
        </>


    )
}

export default CrudCategories