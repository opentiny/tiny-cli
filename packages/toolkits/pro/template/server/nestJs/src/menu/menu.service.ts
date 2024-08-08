import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
  customIcon: string;
  //类型
  menuType: string;
  //父节点
  parentId: number;
  //排序
  order: number;
  //国际化
  locale: string;
}

interface MenuMap {
  [key: number]: Menu;
}

type NumberArray = number[];
const toNode = (menu: Menu): ITreeNodeData => {
  return {
    label: menu.name,
    id: menu.id,
    children: [],
    url: menu.path,
    component: menu.component,
    customIcon: menu.icon,
    menuType: menu.menuType,
    parentId: menu.parentId,
    order: menu.order,
    locale: menu.locale,
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
  private menuId: number[] = [];
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    @InjectRepository(Menu)
    private menu: Repository<Menu>,
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

  async getMenuAllId() {
    const menu = await this.menu.find();
    for (const item of menu) {
      this.menuId.push(item.id)
    }
    await this.handleMenuParentId(this.menuId)
    return this.menuId;
  }

  async handleMenuParentId (menuId: number[]){
    const menu = await this.menu.find();
    if(menu){
      menu[1].parentId = menuId[0];
      menu[2].parentId = menuId[0];
      menu[4].parentId = menuId[3];
      menu[6].parentId = menuId[5];
      menu[7].parentId = menuId[5];
      menu[9].parentId = menuId[8];
      menu[11].parentId = menuId[10];
      menu[12].parentId = menuId[10];
      menu[14].parentId = menuId[13];
      menu[15].parentId = menuId[13];
      menu[16].parentId = menuId[13];
      menu[18].parentId = menuId[17];
      menu[19].parentId = menuId[17];
      menu[21].parentId = menuId[20];
      menu[22].parentId = menuId[20];
      menu[24].parentId = menuId[23];
      menu[26].parentId = menuId[25];
      menu[28].parentId = menuId[27];
      menu[30].parentId = menuId[29];
      menu[31].parentId = menuId[29];
      menu[32].parentId = menuId[29];
    }
    for(const item of menu){
      await this.menu.update(item.id,{ parentId: item.parentId })
    }
  }

  async createMenu(dto: CreateMenuDto, isInit: boolean) {
    const {
      order,
      menuType,
      name,
      path,
      component,
      icon,
      parentId = null,
      locale,
    } = dto;
    const menuInfo = this.menu.findOne({
      where: { name,order,menuType,parentId,path,icon,component,locale },
    });
    if (isInit == true && (await menuInfo)) {
      return menuInfo;
    }
    if ((await menuInfo) && isInit == false) {
      throw new HttpException(
        `菜单字段 ${name} 已经存在`,
        HttpStatus.BAD_REQUEST
      );
    }
    return this.menu.save({
      name,
      path,
      component,
      parentId,
      menuType,
      icon,
      order,
      locale,
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
      locale: newData.locale,
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
