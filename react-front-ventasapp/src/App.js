// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriaProds from './pages/CategoriaProds';
import VentaProds from './pages/VentaProds';
import ClienteProds from './pages/ClienteProds';
import Home from './pages/Home';
import Login from './pages/auth/Loogin';
import Cproductos from './pages/Producto_crud';
import DetalleProducto from './pages/detalle_producto'; // Asegúrate de ajustar la ruta correcta

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          {/* login */}
          <Route path="/" element={<Login />} />
          {/* end login */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/categoria" element={<CategoriaProds />} />
          <Route path="/cliente" element={<ClienteProds />} />
          <Route path="/venta" element={<VentaProds />} />
          <Route path="/producto" element={<Cproductos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} /> {/* Nueva ruta para detalles del producto */}
        </Routes>
      </div>
    </Router>
  );
}


export default App; 