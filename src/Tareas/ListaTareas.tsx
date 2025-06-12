import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tarea } from '../Interfaces/Tarea';
import { obtenerTareas, eliminarTarea } from '../Servicios/TareaService';
import '../Estilos/Listar.css'
import Toast from '../Alert/ShowAlertConfigt';
import { Activity, BadgePlus, CalendarDays, ChartSpline, Edit, Notebook, ScanEye, Trash2 } from 'lucide-react';

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
    await Toast.fire({
      icon: 'warning',
      title: '¡Tarea eliminada!',
      text: 'La tarea se ha eliminado correctamente',
      timer: 3000
    });
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
          <span className="button-icon"><BadgePlus /></span> NUEVA TAREA
        </Link>
      </div>

      <div className="cyber-table-enhanced">
        <div className="table-scroll-container">
          <table>
            <thead>
              <tr className="table-header-row">
                <th className="column-name">
                  <span className="header-icon">
                    <BadgePlus />
                  </span>
                  <span>NOMBRE</span>
                </th>
                <th className="column-status">
                  <span className="header-icon">
                    <ChartSpline />
                  </span>
                  <span>ESTADO</span>
                </th>
                <th className="column-status">
                  <span className="header-icon">
                    <Notebook />
                  </span>
                  <span>DESCRIPCION</span>
                </th>
                <th className="column-date">
                  <span className="header-icon">
                    <CalendarDays />
                  </span>
                  <span>FECHA DE INICIO</span>
                </th>
                <th className="column-date">
                  <span className="header-icon">
                    <CalendarDays />
                  </span>
                  <span>FECHA DE FIN</span>
                </th>
                <th className="column-actions">
                  <span className="header-icon">
                    <Activity />
                  </span>
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
                  <td className="cell-name">
                    <span className="text-glow">{tarea.descripcion}</span>
                  </td>
                  <td className="cell-date">
                    {tarea.fechaInicio ? new Date(tarea.fechaInicio).toLocaleDateString() : 'FECHA NO ENCONTRADA'}
                  </td>
                  <td className="cell-date">
                    {tarea.fechaFinal ? new Date(tarea.fechaFinal).toLocaleDateString() : 'FECHA NO ENCONTRADA'}
                  </td>
                  <td className="cell-actions">
                    <div className="action-buttons">
                      <Link to={`/ver/${tarea.id}`} className="action-btn view-btn">
                        <span className="btn-icon">
                          <ScanEye />
                        </span>
                        <span>VER</span>
                      </Link>
                      <Link to={`/editar/${tarea.id}`} className="action-btn edit-btn">
                        <span className="">
                          <Edit />
                        </span>
                        <span>EDITAR</span>
                      </Link>
                      <button
                        onClick={() => handleEliminar(tarea.id)}
                        className="action-btn delete-btn"
                      >
                        <span className="btn-icon">
                          <Trash2 />
                        </span>
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