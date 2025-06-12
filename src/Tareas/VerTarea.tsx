import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tarea } from '../Interfaces/Tarea';
import { obtenerTareaPorId } from '../Servicios/TareaService';
import '../Estilos/ver.css'
import { CalendarDays, ChartSpline, CornerDownLeft, Edit, Notebook, Pin } from 'lucide-react';

const VerTarea: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tarea, setTarea] = useState<Tarea | null>(null);

  useEffect(() => {
    const cargarTarea = async () => {
      if (id) {
        const tareaData = await obtenerTareaPorId(id);
        setTarea(tareaData);
      }
    };
    cargarTarea();
  }, [id]);

  if (!tarea) return <div>Cargando...</div>;

  return (
    <div className="cyber-detail-container">
      <div className="cyber-detail-header">
        <h1 className="cyber-detail-title">
          <span className="title-glow">DETALLES DE TAREA</span>
          <span className="title-underline-animated"></span>
        </h1>
      </div>

      <div className="cyber-detail-card">
        <div className="cyber-card-body">
          <div className="cyber-detail-section">
            <h2 className="cyber-item-title">
              <span className="section-T"><Pin />
                TAREA</span></h2>
            <p className="cyber-description">{tarea.nombre}</p>
            <div className=""></div>
          </div>

          <div className="cyber-detail-section">
            <h3 className="cyber-section-title">
              <span className="section-icon"><Notebook /></span>
              DESCRIPCIÓN
            </h3>
            <p className="cyber-description">{tarea.descripcion || 'Sin descripción'}</p>
          </div>

          <div className="cyber-detail-grid">
            <div className="cyber-detail-item">
              <h3 className="cyber-section-title">
                <span className="section-icon"><ChartSpline /></span>
                ESTADO
              </h3>
              <span className={`cyber-status ${tarea.completado ? 'completed' : 'pending'}`}>
                {tarea.completado ? 'COMPLETADA' : 'PENDIENTE'}
              </span>
            </div>

            <div className="cyber-detail-item">
              <h3 className="cyber-section-title">
                <span className="section-icon"><CalendarDays /></span>
                FECHA INICIO
              </h3>
              <p className="cyber-date">{tarea.fechaInicio ? new Date(tarea.fechaInicio).toLocaleDateString() : "FECHA NO ENCONTRADA"}</p>
            </div>

            <div className="cyber-detail-item">
              <h3 className="cyber-section-title">
                <span className="section-icon"><CalendarDays /></span>
                FECHA FIN
              </h3>
              <p className="cyber-date">{tarea.fechaFinal ? new Date(tarea.fechaFinal).toLocaleDateString() : "FECHA NO ENCONTRADA"}</p>
            </div>
          </div>

          <div className="cyber-actions">
            <Link to={`/editar/${tarea.id}`} className="cyber-button edit-btn">
              <span className="btn-icon"><Edit/></span>
              EDITAR TAREA
            </Link>
            <Link to="/" className="cyber-button back-btn">
              <span className="btn-icon"><CornerDownLeft /></span>
              VOLVER AL LISTADO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerTarea;