import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu, User } from '@app/models';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DeleteMenuDto } from './dto/delete-menu.dto';

export interface ITreeNodeData {
  // node-key='id' 设置节点的唯一标识
  id: number | string;
  // 节点显示文本
  label: string;
  // 子节点
  children?: ITreeNodeData[];
  // 链接
  url?: string;
}

interface MenuMap {
  [key: number]: Menu;
}

const toNode = (menu: Menu): ITreeNodeData => {
  return {
    label: menu.name,
    id: menu.id,
    children: [],
    url: menu.path,
  };
};

export const convertToTree = (
  menus: Menu[],
  parentId: number | null = null
) => {
  const tree: ITreeNodeData[] = [];
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (menu.parentId === parentId) {
      const children = convertToTree(menus, menu.id);
      const node = toNode(menu);
      node.children = children;
      tree.push(node);
    }
  }
  return tree;
};

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Menu)
    private menu: Repository<Menu>
  ) {}
  async findAll(user: User) {
    const userInfo = await this.user
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .where({
        email: user.email,
      })
      .orderBy('menus.order', 'ASC')
      .getOne();
    const menus = userInfo.role.flatMap((role) => role.menus);
    const maps: MenuMap = {};
    menus.forEach((menu) => {
      maps[menu.id] = menu;
    });
    return convertToTree(menus);
  }
  async createMenu(dto: CreateMenuDto) {
    const {
      order,
      menuType,
      name,
      path,
      component,
      icon,
      parentId = null,
    } = dto;
    return this.menu.save({
      name,
      path,
      component,
      parentId,
      menuType,
      icon,
      order,
    });
  }
  async updateMenu(newData: UpdateMenuDto) {
    await this.menu.update(newData.id, {
      name: newData.name,
      path: newData.path,
      component: newData.component,
      parentId: newData.parentId,
      menuType: newData.menuType,
      icon: newData.icon,
      order: newData.order,
    });
    return true;
  }
  async deleteMenu(dto: DeleteMenuDto) {
    const menu = this.menu.findOne({
      where: {
        id: dto.id,
        name: dto.name,
      },
    });
    return this.menu.remove(await menu);
  }
}
