import { decode, JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

type JWTPayload = JwtPayload & {
  GivenName: string;
  Surname: string;
  Email: string;
  Role: string;
};

export class JwtService {
  private readonly decodedToken: JWTPayload;

  constructor(accessToken?: string) {
    if (!accessToken) {
      throw new Error('JWT access token not provided');
    }

    this.decodedToken = this.parse(accessToken);
  }

  parse(token: string): JWTPayload {
    const payload: JwtPayload | string | null = decode(token);

    if (!payload || typeof payload === 'string') {
      throw new Error('JWT access token payload have incorrect format');
    }

    return payload as JWTPayload;
  }

  compare(token: string): boolean {
    const payload: JWTPayload = this.parse(token);

    return Object.keys(this.decodedToken).every(
      (key: string): boolean => this.decodedToken[key] === payload[key],
    );
  }

  checkAccess(request: NextRequest) {
    const authHeader: string | null = request.headers.get('Authorization');

    if (!authHeader) {
      throw new Error('Unauthorized: JWT access token is missing in authorization header');
    }

    const token: string = authHeader.split(' ')[1];

    if (!this.compare(token)) {
      throw new Error('Unauthorized: JWT access token is invalid');
    }
  }
}
