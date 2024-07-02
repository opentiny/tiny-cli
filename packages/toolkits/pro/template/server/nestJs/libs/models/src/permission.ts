import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  desc: string;
  @Column()
  name: string;
}
