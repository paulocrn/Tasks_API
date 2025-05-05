import { Router } from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../Controllers/TaskController';
import { findUser, addUser } from '../Controllers/UserController';
import { authenticate } from '../../middlewares/auth';

const router = Router();

// Rutas para tareas
router.get('/tasks', authenticate, getTasks);
router.post('/tasks', authenticate, addTask);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

// Rutas para usuarios
router.get('/users/:email', findUser);
router.post('/users', addUser);

export default router;