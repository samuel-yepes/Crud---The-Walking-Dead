export interface Tarea {
  id: string;
  nombre: string;
  descripcion: string;
  completado: false;
  fechaInicio: string; 
  fechaFinal: string;  
}

export type NuevaTarea = Omit<Tarea, 'id'>;
export type TareaActualizada = Partial<Tarea>;