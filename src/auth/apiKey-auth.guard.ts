import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
console.log('ini api key', process.env.API_KEY);
@Injectable()
export class ApiKeyAuthGuard extends AuthGuard(process.env.API_KEY) {}
