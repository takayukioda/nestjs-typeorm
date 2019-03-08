import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as shortid from 'shortid'
import { Repository, FindConditions } from 'typeorm'
import { User } from './user.entity'
import { PasswordService } from 'src/auth/password.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) { }

  async createUser(): Promise<User> {
    const password: HashedPassword = this.passwordService.hash('password')
    const user = new User({
      password,
      name: `john ${shortid.generate()}`,
      email: `john.${shortid.generate()}@example.com`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return this.userRepository.save(user)
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
