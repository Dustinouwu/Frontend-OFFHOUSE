import React, { useEffect, useState } from 'react'
import './HomeAdmin.css'
import HeaderAdmin from '../../components/Layouts/HeaderAdmin'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import SingleCard from '../../components/Reusable/SingleCard';

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};
export const HomeAdmin = () => {

  const navigate = useNavigate();  // Navegar entre rutas
  const [users, setUsers] = useState([])
  const [subs, setSubs] = useState([])
  const [reports, setReports] = useState([]);
  const [products, setProducts] = useState([])
  const tokenUser = localStorage.getItem('token')

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

  const getProducts = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/admin/products',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      )
      setProducts(response.data.data.products)
      console.log(response.data.data.products, 'products');
    } catch (error) {
      console.log(error.response.data.message, 'error');
    }
  }

  const getReports = async () => {
    try {
      const response = await axios.get(
        'https://offhouse.herokuapp.com/api/admin/reports',
        { headers: { 'accept': 'application/json', 'authorization': tokenUser } },
        config
      )
      setReports(response.data.data.reports)
    } catch (error) {
      console.log(error.response.data.message, 'error');
    }
  }


  useEffect(() => {
    getUsers()
    getSubs()
    getProducts()
    getReports()
  }, [])
  const totalUsers = users.length;
  //total de suscripciones registradas en la plataforma
  const totalSubscriptions = subs.length;
  //total de productos registrados en la plataforma
  const totalProducts = products.length;
  //total de reportes registrados en la plataforma
  const totalReports = reports.length;

  const carUser = {
    title: "Total de usuarios",
    totalNumber: totalUsers,
    icon: "ri-user-add-line",
  };
  const carSub = {
    title: "Total de Suscripciones",
    totalNumber: totalSubscriptions,
    icon: "ri-line-chart-line",
  };
  const carProducts = {
    title: "Total de Productos",
    totalNumber: totalProducts,
    icon: "ri-store-2-line",
  };
  const carReports = {
    title: "Total de Reportes Registrados",
    totalNumber: totalReports,
    icon: "ri-alert-line",
  };

  const countUsers = (month) => {
    let count = 0
    users.map(user => {
      if (user.created_at.split('-')[1] === month) {
        count++
      }
    })
    return count
  }

  const countSubs = (month) => {
    let count = 0
    subs.map(sub => {
      if (sub.created_at.split('-')[1] === month) {
        count++
      }
    })
    return count
  }

  const countProducts = (month) => {
    let count = 0
    products.map(product => {
      if (product.created_at.split('-')[1] === month) {
        count++
      }
    })
    return count
  }



  const data = [
    { x: countUsers('01'), y: "Enero" },
    { x: countUsers('02'), y: "Febrero" },
    { x: countUsers('03'), y: "Marzo" },
    { x: countUsers('04'), y: "Abril" },
    { x: countUsers('05'), y: "Mayo" },
    { x: countUsers('06'), y: "Junio" },
    { x: countUsers('07'), y: "Julio" },
    { x: countUsers('08'), y: "Agosto" },
    { x: countUsers('09'), y: "Septiembre" },
    { x: countUsers('10'), y: "Octubre" },
    { x: countUsers('11'), y: "Noviembre" },
    { x: countUsers('12'), y: "Diciembre" },
  ]

  const data2 = [
    { x: countSubs('01'), y: "Enero" },
    { x: countSubs('02'), y: "Febrero" },
    { x: countSubs('03'), y: "Marzo" },
    { x: countSubs('04'), y: "Abril" },
    { x: countSubs('05'), y: "Mayo" },
    { x: countSubs('06'), y: "Junio" },
    { x: countSubs('07'), y: "Julio" },
    { x: countSubs('08'), y: "Agosto" },
    { x: countSubs('09'), y: "Septiembre" },
    { x: countSubs('10'), y: "Octubre" },
    { x: countSubs('11'), y: "Noviembre" },
    { x: countSubs('12'), y: "Diciembre" },
  ]

  const data3 = [
    { x: countProducts('01'), name: "Enero", fill: '#ffc658' },
    { x: countProducts('02'), name: "Febrero", fill: '#d0ed57' },
    { x: countProducts('03'), name: "Marzo", fill: '#82ca9d' },
    { x: countProducts('04'), name: "Abril", fill: '#8884d8' },
    { x: countProducts('05'), name: "Mayo", fill: '#ffc658' },
    { x: countProducts('06'), name: "Junio", fill: '#d0ed57' },
    { x: countProducts('07'), name: "Julio", fill: '#82ca9d' },
    { x: countProducts('08'), name: "Agosto", fill: '#8884d8' },
    { x: countProducts('09'), name: "Septiembre", fill: '#ffc658' },
    { x: countProducts('10'), name: "Octubre", fill: '#d0ed57' },
    { x: countProducts('11'), name: "Noviembre", fill: '#82ca9d' },
    { x: countProducts('12'), name: "Diciembre", fill: '#8884d8' },


  ]


  return (
    <div>
      <div className="dashboard">
        <div className="dashboard__wrapper">
          <div className="dashboard__cards">
            <SingleCard item={carUser} />
            <SingleCard item={carSub} />
            <SingleCard item={carProducts} />
            <SingleCard item={carReports} />
          </div>
        </div>
      </div>



      <div style={{ marginTop: '5%', marginRight: '2%', marginLeft: '2%', marginBottom: '20%' }}>


        <div style={{ widht: '150px', height: '300px' }}>
          <h4>Contador de usuarios por mes</h4>
          <ResponsiveContainer width="100%">

            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 1 2" />
              <XAxis />
              <YAxis label={{ value: 'Usuarios', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="x" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ widht: '150px', height: '300px', marginTop: '10%' }}>
          <h4>Contador de Suscripciones por mes</h4>
          <ResponsiveContainer width="100%" aspect={4}>
            <AreaChart
              width={500}
              height={400}
              data={data2}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="y" />
              <YAxis label={{ value: 'Suscripciones', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Area type="monotone" dataKey="x" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="x" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ widht: '150px', height: '300px', marginTop: '10%', marginBottom: '10%' }}>
            <h4>Contador de Productos por mes</h4>
            <ResponsiveContainer width="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={30} data={data3}>
                <RadialBar
                  minAngle={10}
                  label={{ position: 'insideStart', fill: '#000' }}
                  background clockWise dataKey="x"
                />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={style} />
              </RadialBarChart>

            </ResponsiveContainer>

          </div>
        </div>


      </div>

    </div>
  )
}

