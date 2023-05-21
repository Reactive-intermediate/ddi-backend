import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../dtos/user';
import { Time } from './inheritance';
import { UserEntity } from './user.entity';

@Entity({ name: 'userRole' })
export class UserRoleEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;
}
