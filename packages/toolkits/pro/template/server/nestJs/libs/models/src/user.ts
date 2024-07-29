import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role';
import * as crypto from 'crypto';

export const encry = (value: string, salt: string) =>
  crypto.pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role' })
  role: Role[];
  @Column({nullable: true})
  department: string;
  @Column({nullable: true})
  employeeType: string;
  @Column({type: 'timestamp',nullable: true})
  probationStart: string;
  @Column({type: 'timestamp',nullable: true})
  probationEnd: string;
  @Column({nullable: true})
  probationDuration: string;
  @Column({type: 'timestamp',nullable: true})
  protocolStart: string;
  @Column({type: 'timestamp',nullable: true})
  protocolEnd: string;
  @Column({nullable: true})
  address: string;
  @Column({nullable: true})
  status: number;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;
  @Column({ nullable: true })
  salt: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
  @Column({ type: 'bigint', nullable: true })
  deleteAt: number;
  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
