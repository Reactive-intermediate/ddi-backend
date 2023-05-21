import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Time } from './inheritance';
import { VoteContentEntity } from './vote-content.entity';
import { UserEntity } from './user.entity';
import { CreateDateColumn } from 'typeorm';
import { School } from '../dtos/school';

@Entity({ name: 'vote' })
export class VoteEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: School,
  })
  school: School;

  @Column({ length: 16 })
  topic: string;

  @OneToMany(() => VoteContentEntity, (voteContent) => voteContent.vote, {
    eager: true,
  })
  content: VoteContentEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  startTime: Date;

  @Column({
    type: 'timestamp',
  })
  endTime: Date;

  @BeforeInsert()
  setEndTime() {
    // Vote End TIme 6 MOnth
    const now = new Date();
    now.setMonth(now.getMonth() + 6);
    this.endTime = now;
  }
}
