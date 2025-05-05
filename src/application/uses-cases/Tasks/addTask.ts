import { TaskRepository } from '../../../infrastructure/repositories/TaskRepository';
import { CreateTaskDTO } from '../../dtos/CreateTaskDTO';
import { TaskDTO } from '../../dtos/TaskDTO';

export class AddTaskUseCase {
  constructor(private taskRepo: TaskRepository) {}

  async execute(dto: CreateTaskDTO, userId: string): Promise<TaskDTO> {
    const task = { id: Date.now().toString(), titulo: dto.titulo, descripcion: dto.descripcion, categoria: dto.categoria, userId, completed: false, createdAt: new Date().toISOString() };
    await this.taskRepo.save(task);
  
    return task;
  }
  
}
