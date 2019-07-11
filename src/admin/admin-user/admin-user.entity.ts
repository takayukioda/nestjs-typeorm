import { Exclude } from 'class-transformer'
import { Password } from 'src/type'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn()
  readonly id?: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  email: string

  @Exclude()
  @Column('varchar', { length: 255 })
  password: Password

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  readonly createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  readonly updatedAt?: Date

  constructor(partial: Partial<AdminUser>) {
    Object.assign(this, partial)
  }
}
