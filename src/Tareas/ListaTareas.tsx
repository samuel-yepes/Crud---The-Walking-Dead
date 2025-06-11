import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tarea } from '../Interfaces/Tarea';
import { obtenerTareas, eliminarTarea } from '../Servicios/TareaService';
import '../Estilos/Listar.css'
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>

const ListaTareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    const cargarTareas = async () => {
      const datos = await obtenerTareas();
      setTareas(datos);
    };
    cargarTareas();
  }, []);

  const handleEliminar = async (id: string) => {
    await eliminarTarea(id);
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <div className="cyber-container-enhanced">
      <div className="cyber-header-section">
        <h1 className="cyber-main-title">
          <span className="title-glow">LISTA DE TAREAS</span>
          <span className="title-underline-animated"></span>
        </h1>
        <Link to="/crear" className="cyber-button-add">
          <span className="button-icon">+</span> NUEVA TAREA
        </Link>
      </div>

      <div className="cyber-table-enhanced">
        <div className="table-scroll-container">
          <table>
            <thead>
              <tr className="table-header-row">
                <th className="column-name">
                  <span className="header-icon">📛</span>
                  <span>NOMBRE</span>
                </th>
                <th className="column-status">
                  <span className="header-icon">✅</span>
                  <span>ESTADO</span>
                </th>
                <th className="column-date">
                  <span className="header-icon">📅</span>
                  <span>FECHA INICIO</span>
                </th>
                <th className="column-actions">
                  <span className="header-icon">⚡</span>
                  <span>ACCIONES</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tareas.map(tarea => (
                <tr key={tarea.id} className="table-data-row">
                  <td className="cell-name">
                    <span className="text-glow">{tarea.nombre}</span>
                  </td>
                  <td className="cell-status">
                    <span className={`status-badge ${tarea.completado ? 'completed' : 'pending'}`}>
                      {tarea.completado ? 'COMPLETADO' : 'PENDIENTE'}
                    </span>
                  </td>
                  <td className="cell-date">
                    {new Date(tarea.fechaInicio).toLocaleDateString()}
                  </td>
                  <td className="cell-actions">
                    <div className="action-buttons">
                      <Link to={`/ver/${tarea.id}`} className="action-btn view-btn">
                        <span className="btn-icon">👁️</span>
                        <span>VER</span>
                      </Link>
                      <Link to={`/editar/${tarea.id}`} className="action-btn edit-btn">
                        <span className="btn-icon">✏️</span>
                        <span>EDITAR</span>
                      </Link>
                      <button
                        onClick={() => handleEliminar(tarea.id)}
                        className="action-btn delete-btn"
                      >
                        <span className="btn-icon">🗑️</span>
                        <span>ELIMINAR</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaTareas;