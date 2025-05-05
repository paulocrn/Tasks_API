import { NextFunction, Request, Response } from 'express';
import { GetTasksUseCase } from '../../application/uses-cases/Tasks/getTasks';
import { AddTaskUseCase } from '../../application/uses-cases/Tasks/addTask';
import { UpdateTaskUseCase } from '../../application/uses-cases/Tasks/updateTask';
import { DeleteTaskUseCase } from '../../application/uses-cases/Tasks/deleteTask';
import { TaskRepository } from '../../infrastructure/repositories/TaskRepository';
import { CreateTaskDTO } from '../../application/dtos/CreateTaskDTO';
import { TaskDTO } from '../../application/dtos/TaskDTO';
import { AuthenticatedRequest } from '../../middlewares/middleware';

const taskRepo = new TaskRepository();
const getTasksUseCase = new GetTasksUseCase(taskRepo);
const addTaskUseCase = new AddTaskUseCase(taskRepo);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepo);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepo);


export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Acceso denegado: Usuario no autenticado' });
      return;
    }

    const tasks = await getTasksUseCase.execute(userId);

    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};


export const addTask = async (req: Request, res: Response) => {

  try{
    const dto: CreateTaskDTO = req.body;
    const userId = req.body.userId;

    const task = await addTaskUseCase.execute(dto, userId);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error al crear Tarea' });
  }

  
};


export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTask: Partial<TaskDTO> = req.body;

  if ("estado" in updatedTask) {
    if(updatedTask.estado){
      updatedTask.estado = "Completado";
    }else{
      updatedTask.estado = "Pendiente";
    }    
  }
  
  

  const task = await updateTaskUseCase.execute(id, updatedTask);
  task ? res.json(task) : res.status(404).json({ message: 'Tarea no encontrada' });
};


export const deleteTask = async (req: Request, res: Response) => {
  const result = await deleteTaskUseCase.execute(req.params.id);
  result ? res.sendStatus(204) : res.status(404).json({ message: 'Tarea no encontrada' });
};