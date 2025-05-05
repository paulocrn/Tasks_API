import { db } from '../config/firebase';
import { Task } from '../../domain/models/Task';

export class TaskRepository {
  private collection = db.collection('tasks');


  async getAll(userId: string): Promise<Task[]> {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    
    return snapshot.docs.map(doc => doc.data() as Task);
  }
  


  async save(task: Task): Promise<void> {
    try {
      await this.collection.doc(task.id).set({
        id: task.id,
        titulo: task.titulo,
        descripcion: task.descripcion,
        categoria: task.categoria,
        userId: task.userId,
        completed: task.completed,
        createdAt: new Date().toISOString(),
      });

    } catch (error) { 
      console.error('Error saving task:', error);
      throw new Error('Failed to save task');
    }

  }

  async update(id: string, updatedTask: Partial<Task>): Promise<Task | null> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();

    if (!doc.exists) return null;

    await ref.update(updatedTask);
    return (await ref.get()).data() as Task;
  }

  async delete(id: string): Promise<boolean> {
    const ref = this.collection.doc(id);
    const doc = await ref.get();

    if (!doc.exists) return false;

    await ref.delete();
    return true;
  }
}