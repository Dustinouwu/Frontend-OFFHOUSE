import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Layouts/Header/Header';
import CrudUsers from '../admin/components/FormsUsers/CrudUsers';
import AuthProvider from '../contexts/auth/AuthProvider';
import CrudCategories from '../admin/components/FormsCategories/CrudCategories';
import CrudCom from '../admin/components/FormsCom/CrudCom';
import FormsReports from '../admin/components/FormsReports/CrudReports';
import { Home, Login, ResetPassword, CreateUser, CreateProduct, Help, Chats, Chatings, ProductList, UpdateProduct, ViewProduct, Categories, CategProdView, Profile, UpdateProfile } from '../pages';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { HomeAdmin, LoginAdmin } from '../admin/pages';
import UpdateCategories from '../admin/components/FormsCategories/UpdateCategories';
import HeaderAdmin from '../admin/components/Layouts/HeaderAdmin';
import FormsCategories from '../admin/components/FormsCategories/FormsCategories';
import FormsUsers from '../admin/components/FormsUsers/FormsUsers';
import Chatting from '../components/TestMessage/Chatting';
import FormsComs from '../admin/components/FormsCom/FormsCom';
import CrudProducts from '../admin/components/FormsProducts/CrudProducts';
import FormsProducts from '../admin/components/FormsProducts/FormsProducts';
import CrudSubscription from '../admin/components/FormsSubscription/CrudSubscription';
export const AppRouter = () => {

    const user = JSON.parse(localStorage.getItem('user')) || {};

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

                                {user.role === 'customer' && (
                                    <>
                                        <Route index path='/home' element={<Home />} />

                                        <Route path='/help' element={<Help />} />
                                        <Route path='/test' element={<Chatting />} />
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
                                        
                                    </>
                                )}



                            </Route>

                            <Route element={<HeaderAdmin/>}>
                                {user.role === 'admin' && (
                                    <>
                                        <Route index path='/homeAdmin' element={<HomeAdmin />} />
                                        <Route path='crudcateg' element={<CrudCategories />}></Route>
                                        <Route path='formsCategories' element={<FormsCategories />}></Route>
                                        <Route path='formsCategories/edit/:id' element={<UpdateCategories />}></Route>
                                        <Route path='crudcoms' element={<CrudCom />}></Route>
                                        <Route path='formsComs/view/:id' element={<FormsComs />}></Route>
                                        <Route path='crudreports' element={<FormsReports />}></Route>
                                        <Route path='crudusers' element={<CrudUsers />}></Route>
                                        <Route path='formsUsers/view/:id' element={<FormsUsers />}></Route>
                                        <Route path='crudproducts' element={<CrudProducts />}></Route>
                                        <Route path='formsProducts/view/:id' element={<FormsProducts />}></Route>
                                        <Route path='crudsubscription' element={<CrudSubscription />}></Route>
                                    </>

                                )}
                            </Route>
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider >
    )
}


