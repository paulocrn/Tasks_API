import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { UserDTO } from '../../dtos/UserDTO';
import { AuthService } from '../../services/AuthService';


export class CreateUserUseCase {
    constructor(private userRepo: UserRepository) {}
  
    async execute(dto: CreateUserDTO): Promise<{ user: UserDTO; token: string } | null> {
      if (await this.userRepo.findByEmail(dto.email)) {
        return null; // Usuario ya existe
      }
  
      const user = { id: Date.now().toString(), email: dto.email };
      await this.userRepo.save(user);
  
      const token = AuthService.generateToken(user.id);
      return { user, token };
    }
}
  