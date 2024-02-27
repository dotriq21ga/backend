import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/util';
import { TOKEN_EXPIRE } from 'src/config/constant';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async login(payload: LoginDto) {
    try {
      const user = await this.userService.findAccountUser(payload.email);
      if (!user) {
        throw new HttpException(
          "The email does not exist.",
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPasswordValid = await comparePassword(payload.password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(
          "The email and password are incorrect.",
          HttpStatus.BAD_REQUEST,
        );
      }
      const accessToken = this.jwtService.sign({ email: user.email }, { expiresIn: TOKEN_EXPIRE });
      return new AuthResponseDto(accessToken, TOKEN_EXPIRE, user.id)
    } catch (error) {
      throw error
    }
  }
}