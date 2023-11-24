import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(dto: SignInDto): Promise<{ access_token: string }> {
    const user: User = await this.userService.findByEmail(dto.email);
    const _isPasswordMatch: boolean = await this.isPasswordMatch(
      user.password,
      dto.password
    );
    if (!_isPasswordMatch) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = {
      sub: user._id,
      email: user.email,
      name: `${user.name} ${user.lastName}`,
      isAdmin: user.isAdmin
    };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
  async isPasswordMatch(userPassword: string, dtoPassword: string) {
    if (!userPassword) {
      throw new UnauthorizedException();
    }
    const isPasswordMatch: boolean = await bcrypt.compare(
      dtoPassword,
      userPassword
    );
    return isPasswordMatch;
  }
}
