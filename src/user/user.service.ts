import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, Repository } from 'typeorm'
import { UserCreateDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(dto: UserCreateDto): Promise<User> {
    return this.userRepository.save(dto)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOneBy(conditions: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(conditions)
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }
}
