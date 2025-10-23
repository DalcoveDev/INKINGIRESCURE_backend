import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id: id.toString() } });
  }

  async findByPhoneOrEmail(phone: string, email?: string) {
    const query = this.usersRepository.createQueryBuilder('user');
    
    if (email) {
      query.where('user.phone = :phone OR user.email = :email', { phone, email });
    } else {
      query.where('user.phone = :phone', { phone });
    }
    
    return await query.getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id.toString(), updateUserDto);
    return await this.usersRepository.findOne({ where: { id: id.toString() } });
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id.toString());
    return result;
  }
}