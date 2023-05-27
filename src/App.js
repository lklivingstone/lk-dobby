import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Home from './Pages/Home';
import {Logout} from './Pages/Logout';
import { useSelector } from 'react-redux';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Gallery } from './Pages/Gallery';

function App() {
  const user= useSelector((state)=>state.user.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element= { user ? <Home /> : <Navigate to="/login" replace/>} />
        <Route exact path="/gallery" element= { user ? <Gallery /> : <Navigate to="/login" replace/>} />
        <Route path="/logout" element= {user ? <Logout /> : <Navigate to="/" replace />} />
        <Route path="/login" element= {user ? <Navigate to="/" replace /> :  <Login />} />
        <Route path="/register" element= {user ?<Navigate to="/" replace /> :  <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
