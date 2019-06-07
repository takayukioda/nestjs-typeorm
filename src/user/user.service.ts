import { Injectable } from '@nestjs/common'
import { FindConditions } from 'typeorm'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { UserCreateDto } from './user.dto'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  @Transactional()
  async createUser(dto: UserCreateDto): Promise<User> {
    return this.userRepository.save(dto)
  }

  @Transactional()
  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  @Transactional()
  async findOneBy(conditions: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(conditions)
  }

  @Transactional()
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }
}
