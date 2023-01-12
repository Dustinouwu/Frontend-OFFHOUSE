import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';



const CrudProducts = () => {

    const navigate = useNavigate();  // Navegar entre rutas
    const [products, setProducts] = useState([])
    const tokenUser = localStorage.getItem('token')
    const [pageSize, setPageSize] = React.useState(10);
    const config = {
        headers: { Authorization: `${tokenUser}` }
    };

    const getProducts = async () => {
        try {
            const response = await axios.get(
                'https://offhouse.herokuapp.com/api/admin/products',
                { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
                config
            )
            setProducts(response.data.data.products)
        } catch (error) {
            console.log(error.response.data.message, 'error');
        }
    }

    const deleteProducts = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await axios.delete(
                    `https://offhouse.herokuapp.com/api/admin/products/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
                    config
                )
                await getProducts();
            } catch (error) {
                console.log(error.response.data.message, 'error');
            }
        }
    }

    useEffect(() => {
        getProducts();

    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Título', width: 100 },
        { field: 'price', headerName: 'Precio', width: 100 },
        { field: 'detail', headerName: 'Detalle', width: 300 },
        { field: 'stock', headerName: 'Stock', width: 100 },
        { field: 'state_appliance', headerName: 'Estado Producto', width: 150 },
        { field: 'delivery_method', headerName: 'Método de envio', width: 150 },
        { field: 'brand', headerName: 'Marca', width: 150 },
        { field: 'categorie_id', headerName: 'Categoría', width: 150 },
        { field: 'user_id', headerName: 'Usuario', width: 250 },
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
                    onClick={() => navigate(`/formsProducts/view/${params.id}`)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => deleteProducts(params.id)}
                />,
            ],
        },

    ];



    return (

        <div style={{ marginLeft: '3%', marginRight: '3%', marginTop: '3%', paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', paddingTop: '3%', borderRadius: '10px', backgroundColor: '#D9D9D9' }}>

            <h1 id='labelhelp'>CRUD PRODUCTOS</h1>
            <DataGrid
                rows={products}
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

export default CrudProducts