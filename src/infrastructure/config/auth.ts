import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'atombestc0Mp@Ny44b95b9c2fffdff989549c1c8c76ead00d75cb5293cfce6e4e5a8e09258072709d2e08fa0b7341951c5237d6b752abef41a8e60ec09c0dc9dfd0ae949742b3cdc';

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}


export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}