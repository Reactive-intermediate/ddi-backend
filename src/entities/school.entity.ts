import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { School } from '../dtos/school';
import { Time } from './inheritance';
import { UserEntity } from './user.entity';

@Entity({ name: 'school' })
export class SchoolEntity extends Time {
  @PrimaryColumn()
  school: School;

  @Column()
  studentNumber: number;

  @OneToMany(() => UserEntity, (user) => user.school, { nullable: false })
  user: UserEntity[];
}
