import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission';
import { Menu } from './menu';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Permission, {
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'role_permission' })
  permission: Permission[];

  @ManyToMany(() => Menu)
  @JoinTable({ name: 'role_menu' })
  menus: Menu[];
}
