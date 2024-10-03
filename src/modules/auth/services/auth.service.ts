import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const hashedpassword = await bcrypt.hash(signUpDto.password, 12);

    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedpassword,
    });
    await this.userRepository.insert(user);
    delete user.password;
    return user;
  }
}
