import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Time } from './inheritance';
import { UserRoleEntity } from './user-role.entity';
import { SessionEntity } from './session.entity';
import { VoteEntity } from './vote.entity';
import { SchoolEntity } from './school.entity';

@Entity({ name: 'user' })
export class UserEntity extends Time {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 16 })
  realName: string;

  @ManyToOne(() => SchoolEntity, (School) => School.school, {
    nullable: false,
    eager: true,
  })
  school: SchoolEntity;

  @Column({ length: 16 })
  studentID: string;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 150 })
  password: string;

  @Column({ length: 16 })
  alias: string;

  @Column({ comment: '帳號是否通過 Email 驗證', default: false })
  isVerify: boolean;

  @Column({ comment: '帳號是否被停用 ex: 密碼錯誤太多次', default: false })
  isLock: boolean;

  @OneToMany(() => UserRoleEntity, (role) => role.user, { eager: true })
  role: UserRoleEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.user)
  vote: VoteEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  session: SessionEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
    });
  }
}
