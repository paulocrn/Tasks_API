import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'atombestc0Mp@Ny44b95b9c2fffdff989549c1c8c76ead00d75cb5293cfce6e4e5a8e09258072709d2e08fa0b7341951c5237d6b752abef41a8e60ec09c0dc9dfd0ae949742b3cdc';

//console.log("secretKey ", process.env);

export class AuthService {
  static generateToken(userId: string): string {
    console.log("generate secretKey ", userId, secretKey, jwt.sign({ userId }, secretKey, { expiresIn: '1h' }));
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  }


  static verifyToken(token: string): { id: string } | null {
    try {
      const decoded = jwt.verify(token, secretKey) as { id: string };

      console.log("verify secretKey ", token, secretKey, decoded, jwt.verify(token, secretKey));
      return decoded;
    } catch (error) {
      return null;
    }
  }

}