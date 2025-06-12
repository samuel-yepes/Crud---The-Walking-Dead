import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NuevaTarea } from '../Interfaces/Tarea';
import { crearTarea } from '../Servicios/TareaService';
import '../Estilos/crear.css'
import Toast from '../Alert/ShowAlertConfigt';
import { BadgePlus, CalendarDays, CircleX, FolderPen, Notebook, SaveAll } from 'lucide-react';

const CrearTarea: React.FC = () => {
  const navigate = useNavigate();
  const [tarea, setTarea] = useState<NuevaTarea>({
    nombre: '',
    descripcion: '',
    completado: false,
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFinal: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if(name === 'completado') return;

    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTarea({ ...tarea, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!tarea.nombre.trim() || !tarea.descripcion.trim()) {
      await Toast.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Debes ingresar llenar todos los campos para la tarea'
      });
      setIsSubmitting(false);
      return;
    }
    try {
      const resultado = await crearTarea(tarea);
      console.log('Respuesta del servidor:', resultado);

      await Toast.fire({
        icon: 'success',
        title: '¡Tarea creada!',
        text: 'La tarea se ha creado correctamente',
        timer: 3000
      });
      navigate('/');
    } catch (error) {
      await Toast.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear la tarea',
      });
    }
  };

  return (
    <div className="cyber-form-container">
      <div className="cyber-form-card">
        <div className="cyber-form-header">
          <h1 className="cyber-form-title">
            <span className="title-icon">
              <BadgePlus />
            </span>
            NUEVA TAREA
            <div className="title-underline"></div>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="cyber-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">
                <FolderPen />
              </span>
              NOMBRE
            </label>
            <input
              type="text"
              className="form-input"
              name="nombre"
              value={tarea.nombre}
              onChange={handleChange}
            />
            <div className="input-underline"></div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">
                <Notebook />
              </span>
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

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">
                  <CalendarDays />
                </span>
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
                <span className="label-icon">
                  <CalendarDays />
                </span>
                FECHA FIN
              </label>
              <input
                type="date"
                className="form-input"
                name="fechaFin"
                value={tarea.fechaFinal}
                onChange={handleChange}
              />
              <div className="input-underline"></div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="cyber-button save-button">
              <span className="button-icon">
                <SaveAll />
              </span>
              GUARDAR
            </button>
            <button
              type="button"
              className="cyber-button cancel-button"
              onClick={() => navigate('/')}
            >
              <span className="button-icon">
                <CircleX />
              </span>
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearTarea;