import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import * as shortid from 'shortid'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async createUser(): Promise<User> {
    const user = new User({
      name: 'john',
      email: `${shortid.generate()}`,
      password: 'password',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return await this.userRepository.save(user)
  }
}
