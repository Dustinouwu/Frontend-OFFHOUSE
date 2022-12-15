import './App.css';
import Login from './pages/Login/Login';
import CreateUser from './pages/CreateUser/CreateUser';
import Home from './pages/Home/Home';
import Help from './pages/Help/Help';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login></Login>}></Route>
        <Route path='register' element={<CreateUser></CreateUser>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='help' element={<Help></Help>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
