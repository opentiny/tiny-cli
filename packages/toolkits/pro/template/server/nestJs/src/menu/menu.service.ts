import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu, User } from '@app/models';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

export interface ITreeNodeData {
  // node-key='id' 设置节点的唯一标识
  id: number | string;
  // 节点显示文本
  label: string;
  // 子节点
  children?: ITreeNodeData[];
  // 链接
  url: string;
  //组件
  component: string;
  //图标
  icon: string;
  //类型
  menuType: string;
  //父节点
  parentId: number;
  //排序
  order: number;
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
    component: menu.component,
    icon: menu.icon,
    menuType: menu.menuType,
    parentId: menu.parentId,
    order: menu.order,
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
  async findRoleMenu(email: string) {
    const userInfo = await this.user
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.menus', 'menus')
      .where({
        email: email,
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

  async findAllMenu(){
    const menu = this.menu.find();
    return convertToTree(await menu)
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
  async deleteMenu(id: number, parentId: number) {
    const menu = this.menu.findOne({
      where: {
        id: id,
      },
    });
    const allMenu = await this.menu.find();
    for (const tmp of allMenu){
      if(Number(tmp.parentId) === Number(id)){
        if(Number(parentId) === -1){
          tmp.parentId = null;
        }else {
          tmp.parentId = parentId;
        }
        await this.updateMenu(tmp)
      }
    }
    return this.menu.remove(await menu);
  }
}
