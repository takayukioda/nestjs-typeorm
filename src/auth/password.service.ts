import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

const STRETCHING_ROUND = 14
@Injectable()
export class PasswordService {
  hash(password: RawPassword): HashedPassword {
    return bcrypt.hashSync(password, STRETCHING_ROUND)
  }

  match(raw: RawPassword, hashed: HashedPassword): boolean {
    return bcrypt.compareSync(raw, hashed)
  }
}
