import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { RawPassword, HashedPassword } from 'src/type';

const STRETCHING_ROUND = 14
@Injectable()
export class PasswordService {
  hash(password: RawPassword): HashedPassword {
    return bcrypt.hashSync(password, STRETCHING_ROUND) as HashedPassword
  }

  match(raw: RawPassword, hashed: HashedPassword): boolean {
    return bcrypt.compareSync(raw, hashed)
  }
}
