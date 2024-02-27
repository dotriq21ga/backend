import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { USERS } from 'src/config/constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async seedUsers() {
    if (USERS) {
      const userExits = await this.userRepository.findOne({ where: { name: USERS[0].name } });
      if (!userExits) this.userRepository.save(USERS);
    }
  }

  async auth(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.userRepository.findOne(
        {
          select: ["id", "name", "userName", "email", "avatar"],
          where: { email: decodedToken.email }
        }
      );
      return user;
    } catch (error) {
      throw error
    }
  }

  async findAccountUser(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw error
    }
  }
}
