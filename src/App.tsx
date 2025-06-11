import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import './Estilos/App.css'
import ListaTareas from './Tareas/ListaTareas';
import CrearTarea from './Tareas/CrearTarea';
import EditarTarea from './Tareas/EditarTarea';
import VerTarea from './Tareas/VerTarea';

function App() {
  return (
    <div className="cyber-container">
      <nav className="cyber-nav">
        <div className="nav-glows"></div>
        <Link to="/" className="nav-link">
          <span className="link-icon">🖥</span>
          <span className="link-text">Tareas</span>
          <span className="link-hover"></span>
        </Link>
        <Link to="/crear" className="nav-link">
          <span className="link-icon">+</span>
          <span className="link-text">Crear Tarea</span>
          <span className="link-hover"></span>
        </Link>
        <div className="nav-indicator"></div>
      </nav>

      <Routes>
        <Route path="/" element={<ListaTareas />} />
          <Route path="/crear" element={<CrearTarea />} />
          <Route path="/editar/:id" element={<EditarTarea />} />
          <Route path="/ver/:id" element={<VerTarea />} />
      </Routes>
    </div>
  );
}


export default App;
