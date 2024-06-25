import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly adminUser = {
    username: 'admin',
    password: process.env.ADMIN_PASSWORD_HASH || '',
  };

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (username !== this.adminUser.username) {
      return null;
    }

    if (!this.adminUser.password) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      this.adminUser.password,
    );
    if (!validPassword) {
      return null;
    }
    return { username: this.adminUser.username };
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
