import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Time } from './inheritance';
import { UserEntity } from './user.entity';
import { VoteEntity } from './vote.entity';

@Entity({ name: 'voteComment' })
export class VoteCommentEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VoteEntity, (vote) => vote.id)
  vote: VoteEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column({ length: 2000 })
  message: string;
}
