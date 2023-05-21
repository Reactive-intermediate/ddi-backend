import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Time } from './inheritance';
import { UserEntity } from './user.entity';

@Entity({ name: 'session' })
export class SessionEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column()
  expireAt: Date;

  @Column({ default: false })
  isDelete: boolean;
}
