import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import AuthProvider from '../contexts/auth/AuthProvider';
import { CreateUser, Home, Login, ResetPassword } from '../pages';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>

                            <Route path='/*' element={<Login />} /> 



                        </Routes>
                    </PublicRoute>
                } />



                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<Header />}>
                                <Route index path='/home' element={<Home />} />

                            </Route>

                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
