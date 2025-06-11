export interface Tarea {
  id: string;
  nombre: string;
  descripcion: string;
  completado: boolean;
  fechaInicio: string; 
  fechaFin: string;  
}

export type NuevaTarea = Omit<Tarea, 'id'>;
export type TareaActualizada = Partial<Tarea>;