import { Request, Response } from 'express';
import { FindUserUseCase } from '../../application/uses-cases/Users/findUser';
import { CreateUserUseCase } from '../../application/uses-cases/Users/createUser';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CreateUserDTO } from '../../application/dtos/CreateUserDTO';
import { LoginUseCase } from '../../application/uses-cases/Users/login';
import jwt from 'jsonwebtoken';

const userRepo = new UserRepository();
const findUserUseCase = new FindUserUseCase(userRepo);
const createUserUseCase = new CreateUserUseCase(userRepo);
const loginUseCase = new CreateUserUseCase(userRepo);


export const findUser = async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await findUserUseCase.execute(email);

  const JWT_SECRET = process.env.JWT_SECRET || 'atombestc0Mp@Ny44b95b9c2fffdff989549c1c8c76ead00d75cb5293cfce6e4e5a8e09258072709d2e08fa0b7341951c5237d6b752abef41a8e60ec09c0dc9dfd0ae949742b3cdc';

  if (!user) {
    res.status(404).json({ message: 'Usuario no encontrado' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email }, // payload
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    user,
    token,
  });

  return;
};


export const addUser = async (req: Request, res: Response) => {
  const dto: CreateUserDTO = req.body;

  const result = await createUserUseCase.execute(dto);
  result ? res.status(201).json(result) : res.status(400).json({ message: 'Usuario ya existe' });
};


export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const result = await loginUseCase.execute(email);

  result ? res.status(200).json(result) : res.status(404).json({ message: 'Usuario no encontrado' });
};
