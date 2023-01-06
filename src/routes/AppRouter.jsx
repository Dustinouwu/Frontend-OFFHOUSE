import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Layouts/Header/Header';
/* import FormsUsers from '../components/FormsUsers/FormsUsers'; */
import AuthProvider from '../contexts/auth/AuthProvider';
/* import FormsCategories from '../components/FormsUsers/FormsUsers'; */
/* import FormsCom from '../components/FormsCom/FormsCom'; */
/* import FormsReports from '../components/FormsReports/FormsReports'; */
import { Home, Login, ResetPassword, CreateUser, CreateProduct, Help, Chats, Chatings, ProductList, UpdateProduct, ViewProduct, Categories, CategProdView, Profile, UpdateProfile } from '../pages';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { HomeAdmin, LoginAdmin } from '../admin/pages';
 

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
                                <Route path='/viewproduct/:id' element={<ViewProduct />} />
                                <Route path='/chats' element={<Chats />} />
                                <Route path='/chats/:id' element={<Chatings />} />
                                <Route path='/categories' element={<Categories />} />
                                <Route path='/categories/view/:id' element={<CategProdView />} />
                                <Route path='/CreateProduct' element={<CreateProduct />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/CreateProduct/edit/:id' element={<UpdateProduct />} />
                                <Route path='/productlist' element={<ProductList />}></Route>
                                <Route path='/EditProfile' element={<UpdateProfile />}></Route>
                                {/* <Route path='/crudusers' element={<FormsUsers />}></Route> */}
                                {/* <Route path='/crudcateg' element={<FormsCategories />}></Route>
                                <Route path='/crudcoms' element={<FormsCom />}></Route> */}
                                {/* <Route path='/crudreports' element={<FormsReports />}></Route> */}
                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}
