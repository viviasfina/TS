import { Injectable } from '@nestjs/common';
import { UserService } from 'users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  validateApiKey(apiKey: string) {
    const apiKeys = process.env.API_VALUE;
    return apiKey == apiKeys;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
