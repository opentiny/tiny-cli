import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  order: number;
  @Column({ nullable: true })
  parentId: number;
  @Column()
  menuType: string;
  @Column({ nullable: true })
  icon: string;
  @Column()
  component: string;
  @Column()
  path: string;
  @Column()
  locale: string;
}
