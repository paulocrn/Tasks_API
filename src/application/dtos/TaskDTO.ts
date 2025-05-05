export interface TaskDTO {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    userId: string;
    completed: boolean;
    createdAt?: string;
  }