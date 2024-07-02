import { convertToTree } from '../menu.service';

const cretaeMenuItem = (
  id: number,
  name: string,
  parentId: number | null,
  order = 0
) => {
  return {
    id,
    name,
    parentId,
    order,
    menuType: '',
    icon: '',
    component: '',
    path: '',
  };
};

describe('convertToTree', () => {
  it('mutil root', () => {
    const menus = [
      cretaeMenuItem(1, '0', null, 0),
      cretaeMenuItem(2, '1', null, 1),
      cretaeMenuItem(3, '2', null, 2),
      cretaeMenuItem(4, '3', null, 3),
      cretaeMenuItem(5, '4', null, 5),

      cretaeMenuItem(6, '1-1', 1, 6),
      cretaeMenuItem(7, '1-2', 2, 7),
      cretaeMenuItem(8, '1-3', 1, 8),
      cretaeMenuItem(9, '1-4', 1, 9),
      cretaeMenuItem(10, '1-5', 1, 10),

      cretaeMenuItem(11, '2-1', 2, 11),
      cretaeMenuItem(12, '2-2', 2, 12),
      cretaeMenuItem(13, '2-3', 2, 13),
      cretaeMenuItem(14, '2-4', 2, 14),
      cretaeMenuItem(15, '2-5', 2, 15),

      cretaeMenuItem(16, '1-1-1', 6, 16),
      cretaeMenuItem(17, '1-1-2', 6, 17),
      cretaeMenuItem(18, '1-1-3', 6, 18),
      cretaeMenuItem(19, '1-1-4', 6, 19),
      cretaeMenuItem(20, '1-1-5', 6, 20),
    ];
    const data = convertToTree(menus);
    expect(data).toStrictEqual([
      {
        label: '0',
        id: 1,
        children: [
          {
            label: '1-1',
            id: 6,
            children: [
              {
                label: '1-1-1',
                id: 16,
                children: [],
                url: '',
              },
              {
                label: '1-1-2',
                id: 17,
                children: [],
                url: '',
              },
              {
                label: '1-1-3',
                id: 18,
                children: [],
                url: '',
              },
              {
                label: '1-1-4',
                id: 19,
                children: [],
                url: '',
              },
              {
                label: '1-1-5',
                id: 20,
                children: [],
                url: '',
              },
            ],
            url: '',
          },
          {
            label: '1-3',
            id: 8,
            children: [],
            url: '',
          },
          {
            label: '1-4',
            id: 9,
            children: [],
            url: '',
          },
          {
            label: '1-5',
            id: 10,
            children: [],
            url: '',
          },
        ],
        url: '',
      },
      {
        label: '1',
        id: 2,
        children: [
          {
            label: '1-2',
            id: 7,
            children: [],
            url: '',
          },
          {
            label: '2-1',
            id: 11,
            children: [],
            url: '',
          },
          {
            label: '2-2',
            id: 12,
            children: [],
            url: '',
          },
          {
            label: '2-3',
            id: 13,
            children: [],
            url: '',
          },
          {
            label: '2-4',
            id: 14,
            children: [],
            url: '',
          },
          {
            label: '2-5',
            id: 15,
            children: [],
            url: '',
          },
        ],
        url: '',
      },
      {
        label: '2',
        id: 3,
        children: [],
        url: '',
      },
      {
        label: '3',
        id: 4,
        children: [],
        url: '',
      },
      {
        label: '4',
        id: 5,
        children: [],
        url: '',
      },
    ]);
  });
  it('empty', () => {
    expect(convertToTree([])).toStrictEqual([]);
  });
  it('not root', () => {
    const menus = [
      cretaeMenuItem(1, '0', 0, 0),
      cretaeMenuItem(2, '1', 0, 1),
      cretaeMenuItem(3, '2', 0, 2),
      cretaeMenuItem(4, '3', 0, 3),
      cretaeMenuItem(5, '4', 0, 5),

      cretaeMenuItem(6, '1-1', 1, 6),
      cretaeMenuItem(7, '1-2', 2, 7),
      cretaeMenuItem(8, '1-3', 1, 8),
      cretaeMenuItem(9, '1-4', 1, 9),
      cretaeMenuItem(10, '1-5', 1, 10),

      cretaeMenuItem(11, '2-1', 2, 11),
      cretaeMenuItem(12, '2-2', 2, 12),
      cretaeMenuItem(13, '2-3', 2, 13),
      cretaeMenuItem(14, '2-4', 2, 14),
      cretaeMenuItem(15, '2-5', 2, 15),

      cretaeMenuItem(16, '1-1-1', 6, 16),
      cretaeMenuItem(17, '1-1-2', 6, 17),
      cretaeMenuItem(18, '1-1-3', 6, 18),
      cretaeMenuItem(19, '1-1-4', 6, 19),
      cretaeMenuItem(20, '1-1-5', 6, 20),
    ];
    const data = convertToTree(menus);
    console.log(data);
  });
});
