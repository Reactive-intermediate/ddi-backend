import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Time } from './inheritance';
import { VoteEntity } from './vote.entity';

@Entity({ name: 'voteContent' })
export class VoteContentEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VoteEntity, (vote) => vote.id)
  vote: VoteEntity;

  @Column()
  title: string;

  @Column()
  content: string;
}
