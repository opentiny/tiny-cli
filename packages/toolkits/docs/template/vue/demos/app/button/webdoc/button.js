export default {
  column: '2',
  demos: [
    {
      demoId: 'button-type',
      name: {
        'zh-CN': '按钮类型',
        'en-US': 'button type',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>type</code>配置按钮类型，包含<code>success</code>、<code>info</code>、<code>warning</code>、<code>danger</code>四种类型。',
        'en-US': '<p>button type</p>',
      },
      codeFiles: ['button-type.vue'],
    },
    {
      demoId: 'button-round',
      name: {
        'zh-CN': '圆角按钮',
        'en-US': 'button round',
      },
      desc: {
        'zh-CN': '<p>通过<code>round</code>属性设置按钮是否圆角',
        'en-US': '<p>button round</p>',
      },
      codeFiles: ['button-round.vue'],
    },
    {
      demoId: 'button-click',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN': '<p>按钮点击事件。',
        'en-US': '<p>bbutton click</p>',
      },
      codeFiles: ['button-click.vue'],
    },
  ],
  apis: [
    {
      name: 'Button', // 组件名称展示使用
      type: 'component', // API 类型
      properties: [
        {
          name: 'type',
          type: '"primary" | "success" | "warning"',
          defaultValue: '',
          desc: {
            'zh-CN': '<p>展示按钮不同的状态</p>',
            'en-US': 'display different button',
          },
          demoId: 'button-type',
        },
      ],
      events: [
        {
          name: 'click',
          type: '',
          defaultValue: '',
          desc: {
            'zh-CN': '<p>点击按钮时触发的回调</p>',
            'en-US': 'Click',
          },
          demoId: 'button-click',
        },
      ],
    },
  ],
};
