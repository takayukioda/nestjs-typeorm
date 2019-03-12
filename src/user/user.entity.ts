import { Exclude } from 'class-transformer'
import { Password } from 'src/type'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  readonly id?: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  email: string

  @Exclude()
  @Column('varchar', { length: 255 })
  password: Password

  @CreateDateColumn({ type: 'bigint', name: 'created_at' })
  readonly createdAt?: number

  @UpdateDateColumn({ type: 'bigint', name: 'updated_at' })
  readonly updatedAt?: number

  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }
}
