import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  email: string

  @Column('varchar', { length: 255 })
  password: string

  @Column('bigint')
  createdAt: number

  @Column('bigint')
  updatedAt: number
}
