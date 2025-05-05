export interface CreateTaskDTO {
    titulo: string;
    descripcion: string;
    categoria: string;
    userId: string;
    completed: boolean;
    createdAt?: string;
}