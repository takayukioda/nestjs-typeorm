import { Exclude } from 'class-transformer'
import { Password } from 'src/type'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  email: string

  @Exclude()
  @Column('varchar', { length: 255 })
  password: Password

  @Column('bigint')
  createdAt: number

  @Column('bigint')
  updatedAt: number

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
