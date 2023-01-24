import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const CrudCom = () => {

    const navigate = useNavigate();  // Navegar entre rutas
    const [comments, setComments] = useState([]);  // Listar categorias
    const tokenUser = localStorage.getItem('token')
    const [pageSize, setPageSize] = React.useState(10);
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
            } catch (error) {
                console.log(error.response.data.message, 'error');
            }

        }
    }

    useEffect(() => {
        getComment()
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'comment', headerName: 'Comentario', width: 750 },
        { field: 'user_id', headerName: 'ID Usuario', width: 130 },
        { field: 'product_id', headerName: 'ID Producto', width: 130 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<RemoveRedEyeSharpIcon />}
                    label="View"
                    onClick={() => navigate(`/formsComs/view/${params.id}`)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => deleteComment(params.id)}
                />,
            ],
        },

    ];


    return (
        <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>

            <h1 id='labelhelp'>CRUD COMENTARIOS</h1>
            <DataGrid
                rows={comments}
                columns={columns}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}

                pageSize={pageSize}
                sx={{ height: '650px', border: '1px solid white', backgroundColor: '#BCB8B8' }}

            >
            </DataGrid>


        </div>


    )
}

export default CrudCom