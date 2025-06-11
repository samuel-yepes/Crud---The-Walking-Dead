import axios from 'axios';
import { Tarea, NuevaTarea, TareaActualizada } from '../Interfaces/Tarea';

const API_URL = 'https://localhost:44340/api/Tareas'; 

export const obtenerTareas = async (): Promise<Tarea[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const obtenerTareaPorId = async (id: string): Promise<Tarea> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearTarea = async (tarea: NuevaTarea): Promise<Tarea> => {
  const response = await axios.post(API_URL, tarea);
  return response.data;
};

export const actualizarTarea = async (id: string, tarea: TareaActualizada): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, tarea);
};

export const eliminarTarea = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};