import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NuevaTarea } from '../Interfaces/Tarea';
import { crearTarea } from '../Servicios/TareaService';
import '../Estilos/crear.css'

const CrearTarea: React.FC = () => {
  const navigate = useNavigate();
  const [tarea, setTarea] = useState<NuevaTarea>({
    nombre: '',
    descripcion: '',
    completado: false,
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTarea({ ...tarea, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearTarea(tarea);
    navigate('/');
  };

  return (
    <div className="cyber-form-container">
      <div className="cyber-form-card">
        <div className="cyber-form-header">
          <h1 className="cyber-form-title">
            <span className="title-icon">✚</span>
            NUEVA TAREA
            <div className="title-underline"></div>
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="cyber-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📛</span>
              NOMBRE
            </label>
            <input 
              type="text" 
              className="form-input" 
              name="nombre" 
              value={tarea.nombre} 
              onChange={handleChange} 
              required 
            />
            <div className="input-underline"></div>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📝</span>
              DESCRIPCIÓN
            </label>
            <textarea 
              className="form-textarea" 
              name="descripcion" 
              value={tarea.descripcion} 
              onChange={handleChange} 
              rows={3}
            />
            <div className="input-underline"></div>
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                className="checkbox-input" 
                name="completado" 
                checked={tarea.completado} 
                onChange={handleChange} 
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">COMPLETADO</span>
            </label>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">⏱️</span>
                FECHA INICIO
              </label>
              <input 
                type="date" 
                className="form-input" 
                name="fechaInicio" 
                value={tarea.fechaInicio} 
                onChange={handleChange} 
              />
              <div className="input-underline"></div>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">⏳</span>
                FECHA FIN
              </label>
              <input 
                type="date" 
                className="form-input" 
                name="fechaFin" 
                value={tarea.fechaFin} 
                onChange={handleChange} 
              />
              <div className="input-underline"></div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="cyber-button save-button">
              <span className="button-icon">💾</span>
              GUARDAR
            </button>
            <button 
              type="button" 
              className="cyber-button cancel-button" 
              onClick={() => navigate('/')}
            >
              <span className="button-icon">✖</span>
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearTarea;