import './App.css';
import Login from './pages/Login/Login';
import CreateUser from './pages/CreateUser/CreateUser';
import Home from './pages/Home/Home';
import Help from './pages/Help/Help';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import Header from './components/Header/Header';
import FormsUsers from './components/FormsUsers/FormsUsers';
import FormProducts from './components/FormsProducts/FormsProducts';
import FormsCategories from './components/FormsCategories/FormsCategories';
import FormsCom from './components/FormsCom/FormsCom';
import FormsReports from './components/FormsReports/FormsReports';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<CreateUser></CreateUser>}></Route>
          <Route path='resetpssw' element={<ResetPassword></ResetPassword>}></Route>
        </Route>
        <Route element={<Header />}>
          <Route path='home' element={<Home />}></Route>
          <Route path='help' element={<Help />}></Route>
          <Route path='createproduct' element={<CreateProduct />}></Route>
          <Route path='crudproductos' element={<FormProducts />}></Route>
        </Route>
        <Route path='crudcateg' element={<FormsCategories />}></Route>
        <Route path='crudcoms' element={<FormsCom />}></Route>
        <Route path='crudreports' element={<FormsReports />}></Route>
        <Route path='crudusers' element={<FormsUsers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
