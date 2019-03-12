import { HashedPassword } from 'src/type'

export class UserCreateDto {
  readonly name: string
  readonly email: string
  readonly password: HashedPassword

  constructor(name: string, email: string, password: HashedPassword) {
    this.name = name
    this.email = email
    this.password = password
  }
}
