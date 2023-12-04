import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './App.css';
import CategoriaProds from './pages/CategoriaProds';
import VentaProds from './pages/VentaProds';
import ClienteProds from './pages/ClienteProds';
import Home from './pages/Home';
import Login from "./pages/auth/Loogin";
import Cproductos from './pages/Producto_crud';

function App() {
  return (
 <Router>
  <div className=''>
     <Routes>
      {/* login */}
      <Route path="/" element={<Login />} />
      {/* end login */}
     <Route path="/dashboard" element={<Home/>} />
     <Route path="/categoria" element={<CategoriaProds />} />
     <Route path="/cliente" element={<ClienteProds />} />
     <Route path="/venta" element={<VentaProds />} />
     <Route path="/producto" element={<Cproductos />} />
     </Routes>
  </div>
   </Router>
  );
}

export default App;
