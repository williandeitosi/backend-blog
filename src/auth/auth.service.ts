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
    const usernameExists = username === this.adminUser.username;
    if (!usernameExists) {
      throw Error('Email address or password is incorret.');
    }

    if (!this.adminUser.password) {
      throw Error('Email address or password is incorret.');
    }

    const validPassword = await bcrypt.compare(
      password,
      this.adminUser.password,
    );
    if (!validPassword) {
      throw Error('Email address or password is incorret.');
    }
    return { username: this.adminUser.username };
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
