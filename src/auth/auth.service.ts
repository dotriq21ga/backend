import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/util';
import { TOKEN_EXPIRE } from 'src/config/constant';
import { ApiAuthResponse } from './dto/apiAuthResponese.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, private jwtService: JwtService
  ) { }

  async login(data: LoginDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email: data.email } });
      if (!user) {
        throw new HttpException(
          "The email does not exist.",
          HttpStatus.BAD_REQUEST,
        );
      }
      const isPasswordValid = await comparePassword(data.password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(
          "The email and password are incorrect.",
          HttpStatus.BAD_REQUEST,
        );
      }
      const accessToken = this.jwtService.sign({ email: user.email }, { expiresIn: TOKEN_EXPIRE });
      return new ApiAuthResponse(accessToken, '', TOKEN_EXPIRE, user.id)
    } catch (error) {
      throw error
    }
  }
}