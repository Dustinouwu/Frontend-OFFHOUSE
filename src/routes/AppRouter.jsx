import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import FormsUsers from '../components/FormsUsers/FormsUsers';
import AuthProvider from '../contexts/auth/AuthProvider';
import FormsCategories from '../components/FormsUsers/FormsUsers';
import FormsCom from '../components/FormsCom/FormsCom';
import FormsReports from '../components/FormsReports/FormsReports';
import FormsProducts from '../components/FormsProducts/FormsProducts';

import { Home, Login, ResetPassword, CreateUser, CreateProduct, Help, Chat, ProductList, UpdateProduct } from '../pages';
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
                            <Route path='createuser/*' element={<CreateUser />} />
                            <Route path='resetpssw/*' element={<ResetPassword></ResetPassword>}></Route>
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
                                <Route path='/help' element={<Help />} />
                                <Route path='/chat' element={<Chat />} />
                                <Route path='/CreateProduct' element={<CreateProduct />} />
                                <Route path='/CreateProduct/edit/:id' element={<UpdateProduct />} />
                                <Route path='/productlist' element={<ProductList />}></Route>
                                <Route path='/crudusers' element={<FormsUsers />}></Route>
                                <Route path='/crudcateg' element={<FormsCategories />}></Route>
                                <Route path='/crudcoms' element={<FormsCom />}></Route>
                                <Route path='/crudreports' element={<FormsReports />}></Route>
                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
