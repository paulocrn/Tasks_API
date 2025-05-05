import { TaskRepository } from '../../../infrastructure/repositories/TaskRepository';
import { TaskDTO } from '../../dtos/TaskDTO';

export class UpdateTaskUseCase {
    constructor(private taskRepo: TaskRepository) {}
  
    async execute(id: string, updatedTask: Partial<TaskDTO>): Promise<TaskDTO | null> {
      const task = await this.taskRepo.update(id, updatedTask);
      return task ? { id: task.id, titulo: task.titulo, descripcion: task.descripcion, categoria: task.categoria, userId: task.userId, completed: task.completed } : null;
    }
  }
  