import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { AuthService } from '../../services/AuthService';
import { UserDTO } from '../../dtos/UserDTO';

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string): Promise<{ user: UserDTO; token: string } | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null; // Usuario no encontrado

    const token = AuthService.generateToken(user.id);
    return { user, token };
  }
}