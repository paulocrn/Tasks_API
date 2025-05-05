import { User } from '../../domain/models/User';
import { db } from '../config/firebase';

export class UserRepository {
  private collection = db.collection('users');

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as User;
  }


  async save(user: User): Promise<void> {
    await this.collection.doc(user.id).set({
      id: user.id,
      email: user.email
    });
  }
  
}
