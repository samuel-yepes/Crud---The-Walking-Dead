import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import './Estilos/App.css'
import ListaTareas from './Tareas/ListaTareas';
import CrearTarea from './Tareas/CrearTarea';
import EditarTarea from './Tareas/EditarTarea';
import VerTarea from './Tareas/VerTarea';
import { BadgePlus, BookOpenCheck, ChartNoAxesCombined } from 'lucide-react';
import EstadisticasTareas from './Estadisticas.tsx/Estadisticas';
import { useEffect, useState } from 'react';
import { Tarea } from './Interfaces/Tarea';
import { obtenerTareas } from './Servicios/TareaService';

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]); 

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasObtenidas = await obtenerTareas(); 
        setTareas(tareasObtenidas);
      } catch (error) {
        console.error("Error cargando tareas:", error);
      }
    };
    cargarTareas();
  }, []);
  return (
    <div className="cyber-container">
      <nav className="cyber-nav">
        <div className="nav-glows"></div>
        <div className="nav-logo-container" >
          <img src="logo.png" alt="Logo mio" className="nav-logo"/>
        </div>

        <Link to="/" className="nav-link">
          <span className="link-icon">
            <BookOpenCheck />
          </span>
          <span className="link-text">Tareas</span>
          <span className="link-hover"></span>
        </Link>
        <Link to="/crear" className="nav-link">
          <span className="link-icon">
            <BadgePlus />
          </span>
          <span className="link-text">Crear Tarea</span>
          <span className="link-hover"></span>
        </Link>
        <Link to="/estadisticas" className="nav-link">
          <span className="link-icon">
            <ChartNoAxesCombined />
          </span>
          <span className="link-text">Estadisticas</span>
          <span className="link-hover"></span>
        </Link>
        <div className="nav-indicator"></div>
      </nav>

      <Routes>
        <Route path="/" element={<ListaTareas />} />
          <Route path="/crear" element={<CrearTarea />} />
          <Route path="/editar/:id" element={<EditarTarea />} />
          <Route path="/ver/:id" element={<VerTarea />} />
          <Route path="/estadisticas" element={<EstadisticasTareas tareas={tareas} />} />
      </Routes>
    </div>
  );
}


export default App;
