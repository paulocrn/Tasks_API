import { TaskRepository } from '../../../infrastructure/repositories/TaskRepository';
import { TaskDTO } from '../../dtos/TaskDTO';

export class GetTasksUseCase {
    constructor(private taskRepo: TaskRepository) {}
  
    async execute(userId: string): Promise<TaskDTO[]> {
      const tasks = await this.taskRepo.getAll(userId);
      return tasks.map(task => ({
        id: task.id,
        titulo: task.titulo,
        descripcion: task.descripcion,
        categoria: task.categoria,
        userId: task.userId,
        completed: task.completed,
        createdAt: task.createdAt??undefined
      }));
    }
  }
  