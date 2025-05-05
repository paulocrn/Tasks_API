import { TaskRepository } from '../../../infrastructure/repositories/TaskRepository';

export class DeleteTaskUseCase {
    constructor(private taskRepo: TaskRepository) {}
  
    async execute(id: string): Promise<boolean> {
      return await this.taskRepo.delete(id);
    }
    
  }
  