import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as argon2 from 'argon2';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 16 })
  realName: string;

  @Column({ length: 16 })
  school: string;

  @Column({ length: 16 })
  studentID: string;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 32 })
  password: string;

  @Column({ length: 16 })
  alias: string;

  @Column({ comment: '帳號是否通過 Email 驗證', default: false })
  isVerify: boolean;

  @Column({ comment: '帳號是否被停用 ex: 密碼錯誤太多次', default: false })
  isLock: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
    });
  }
}
