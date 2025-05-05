import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { UserDTO } from '../../dtos/UserDTO';
import { AuthService } from '../../services/AuthService';

export class FindUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string): Promise<UserDTO | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      return null;
    }
    
    return { id: user.id, email: user.email };
  }
}