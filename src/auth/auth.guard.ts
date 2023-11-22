import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.validatePublic(context);
    const isAdmin: boolean = this.validateAdmin(context);
    if (isPublic || isAdmin) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: object = await this.validateToken(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  private validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret
    });
  }

  private validatePublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass()
    ]);
  }

  private validateAdmin(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>('isAdmin', [
      context.getHandler(),
      context.getClass()
    ]);
  }
}
