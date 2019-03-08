import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
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
