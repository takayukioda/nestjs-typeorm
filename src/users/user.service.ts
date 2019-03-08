import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as shortid from 'shortid'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(): Promise<User> {
    const user = new User({
      name: `john ${shortid.generate()}`,
      email: `john.${shortid.generate()}@example.com`,
      password: 'password',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

}
