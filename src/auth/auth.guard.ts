import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.validatePublic(context);
    const isAdmin: boolean = this.validateAdmin(context);
    const request: Request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);

    if (isPublic) {
      return true;
    }

    if (!token && !isAdmin) {
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
      secret: this.configService.get('jwtSecret')
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
