import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ProductListar from './Productos/ProductoLeer';
import ProductCrear from './Productos/ProductoCrear';
import ProductEditar from './Productos/ProductoEditar';
import './Estilos/App.css'

function App() {
  return (
    <div className="cyber-container">
      <nav className="cyber-nav">
        <div className="nav-glows"></div>
        <Link to="/productos" className="nav-link">
          <span className="link-icon">🖥</span>
          <span className="link-text">Productos</span>
          <span className="link-hover"></span>
        </Link>
        <Link to="/productos/crear" className="nav-link">
          <span className="link-icon">+</span>
          <span className="link-text">Crear Producto</span>
          <span className="link-hover"></span>
        </Link>
        <div className="nav-indicator"></div>
      </nav>

      <Routes>
        <Route path="/productos" element={<ProductListar />} />
        <Route path="/productos/crear" element={<ProductCrear />} />
        <Route path="/productos/editar/:id" element={<ProductEditar />} />
      </Routes>
    </div>
  );
}


export default App;
