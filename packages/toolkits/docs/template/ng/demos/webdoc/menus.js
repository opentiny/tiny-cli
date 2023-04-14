// 注意，删除了useFor属性

// title,label增加英文版，以应对将来的国际化功能
export const docMenus = [
  {
    label: '使用指南',
    labelEn: 'Guide', // ***********
    key: 'doc_use',
    children: [
      {
        title: '介绍',
        titleEn: 'Introduce',
        key: 'introduce',
      },
    ],
  },
];

// -------------------------------------------------------------------
export const cmpMenus = [
  {
    label: '表单选择',
    labelEn: 'Form Selection',
    key: 'cmp_formselect',
    children: [
      { name: 'Button', nameCn: '按钮', key: 'button' },
      { name: 'Buttongroup', nameCn: '选块组', key: 'buttongroup' },
    ],
  },
];
