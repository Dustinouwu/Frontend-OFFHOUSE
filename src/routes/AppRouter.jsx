import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import FormsUsers from '../components/FormsUsers/FormsUsers';
import AuthProvider from '../contexts/auth/AuthProvider';
import { CreateUser, Home, Login, ResetPassword } from '../pages';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginAdmin } from '../pagesAdmin';
import { HomeAdmin } from '../pagesAdmin/HomeAdmin/HomeAdmin';

export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* RUTAS PUBLICAS */}
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route path='/*' element={<Login />} />
                            <Route path='admin/*' element={<LoginAdmin />} />
                        </Routes>
                    </PublicRoute>
                } />
                
                {/* RUTAS PRIVADAS */}
                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<Header />}>
                                <Route index path='/home' element={<Home />} />
                                <Route index path='/homeAdmin' element={<HomeAdmin />} />
                                <Route path='/crudusers' element={<FormsUsers />}></Route>
                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
