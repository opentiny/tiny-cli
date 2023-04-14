export default {
  column: '2',
  demos: [
    {
      demoId: 'button-color',
      name: {
        'zh-CN': '按钮颜色',
        'en-US': 'button color',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>color</code>配置按钮颜色，包含<code>default</code>、<code>danger</code>、<code>primary</code>三种类型。',
        'en-US': '<p>button color</p>',
      },
      apis: ['TiButtonComponent.properties.color'],
      tag: 'website-tiny-button-color',
      codeFiles: ['button-color.html', 'ButtonColorComponent.ts'],
    },
    {
      demoId: 'button-size',
      name: {
        'zh-CN': '按钮大小',
        'en-US': 'button size',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>size</code>配置按钮大小。',
        'en-US': '<p>button size</p>',
      },
      apis: ['TiButtonComponent.properties.size'],
      tag: 'website-tiny-button-size',
      codeFiles: ['button-size.html', 'ButtonSizeComponent.ts'],
    },
    {
      demoId: 'button-hasborder',
      name: {
        'zh-CN': '按钮是否带边框',
        'en-US': 'button hasBorder',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>hasBorder</code>配置按钮是否带边框。</p>',
        'en-US': '<p>button hasBorder</p>',
      },
      apis: ['TiButtonComponent.properties.hasBorder'],
      tag: 'website-tiny-button-hasborder',
      codeFiles: ['button-hasborder.html', 'ButtonHasborderComponent.ts'],
    },
    {
      demoId: 'button-label',
      name: {
        'zh-CN': '按钮为确认/取消按钮',
        'en-US': 'button label',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>label</code>配置按钮为确认/取消按钮。</p>',
        'en-US': '<p>button label</p>',
      },
      apis: ['TiButtonComponent.properties.label'],
      tag: 'website-tiny-button-label',
      codeFiles: ['button-label.html', 'ButtonLabelComponent.ts'],
    },
    {
      demoId: 'button-icon',
      name: {
        'zh-CN': '图标按钮',
        'en-US': 'button icon',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>icon</code>配置按钮是否包含图标。</p>',
        'en-US': '<p>button icon</p>',
      },
      apis: ['TiButtonComponent.properties.icon'],
      tag: 'website-tiny-button-icon',
      codeFiles: ['button-icon.html', 'ButtonIconComponent.ts'],
    },
    {
      demoId: 'button-loading',
      name: {
        'zh-CN': '加载中',
        'en-US': 'button icon',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>loading</code>配置按钮是否加载中状态。</p>',
        'en-US': '<p>button loading</p>',
      },
      apis: ['TiButtonComponent.properties.loading'],
      tag: 'website-tiny-button-loading',
      codeFiles: ['button-loading.html', 'ButtonLoadingComponent.ts'],
    },
    {
      demoId: 'button-onlyicon',
      name: {
        'zh-CN': '纯图标',
        'en-US': 'button onlyicon',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>onlyIcon</code>配置是否为纯图标。</p>',
        'en-US': '<p>button onlyicon</p>',
      },
      apis: ['TiButtonComponent.properties.onlyIcon'],
      tag: 'website-tiny-button-onlyicon',
      codeFiles: ['button-onlyicon.html', 'ButtonOnlyiconComponent.ts'],
    },
    {
      demoId: 'button-disabled',
      name: {
        'zh-CN': '禁用按钮',
        'en-US': 'button disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '<p>button disabled</p>',
      },
      apis: ['TiButtonComponent.properties.disabled'],
      tag: 'website-tiny-button-disabled',
      codeFiles: ['button-disabled.html', 'ButtonDisabledComponent.ts'],
    },
    {
      demoId: 'button-focus',
      name: {
        'zh-CN': '自动聚焦',
        'en-US': 'button focus',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>autofocus</code>配置页面重新加载时是否自动聚焦。</p>',
        'en-US': '<p>A button should automatically get focus when the page loads</p>',
      },
      tag: 'website-tiny-button-focus',
      codeFiles: ['button-focus.html', 'ButtonFocusComponent.ts'],
    },
    {
      demoId: 'button-tip',
      name: {
        'zh-CN': '提示气泡',
        'en-US': 'button tip',
      },
      desc: {
        'zh-CN': '<p>可与 Tip 组件结合来显示按钮提示信息，鼠标悬停到元素上即可出现气泡提示。</p>',
        'en-US': '<p>button tip</p>',
      },
      tag: 'website-tiny-button-tip',
      codeFiles: ['button-tip.html', 'ButtonTipComponent.ts'],
    },
    {
      demoId: 'button-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'button event',
      },
      desc: {
        'zh-CN': '<p>按钮点击事件。</p>',
        'en-US': '<p>button event</p>',
      },
      tag: 'website-tiny-button-event',
      codeFiles: ['button-event.html', 'ButtonEventComponent.ts'],
    },
  ],
  apis: [
    {
      name: 'TiButtonComponent',
      type: 'component',
      properties: [
        {
          name: 'color',
          type: '"default" | "danger" | "primary"',
          defaultValue: "'default'",
          desc: {
            'zh-CN': '<p>按钮颜色</p>',
            'en-US': 'color',
          },
          demoId: 'button-color',
        },
        {
          name: 'hasBorder',
          type: 'boolean',
          defaultValue: 'true',
          desc: {
            'zh-CN': '<p>是否为无边框文本按钮</p>',
            'en-US': 'hasBorder',
          },
          demoId: 'button-hasborder',
        },
        {
          name: 'icon',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '<p>是否包含图标</p>',
            'en-US': 'icon',
          },
          demoId: 'button-icon',
        },
        {
          name: 'label',
          type: '"ok" | "cancel"',
          defaultValue: 'undefined',
          desc: {
            'zh-CN': '<p>是否为确认取消按钮</p>',
            'en-US': 'label',
          },
          demoId: 'button-label',
        },
        {
          name: 'loading',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '<p>是否处于加载状态，一般用于异步提交场景</p>',
            'en-US': 'loading',
          },
          demoId: 'button-loading',
        },
        {
          name: 'onlyIcon',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '<p>是否为纯图标按钮</p>',
            'en-US': 'onlyIcon',
          },
          demoId: 'button-onlyicon',
        },
        {
          name: 'size',
          type: '"xs" | "small" | "middle" | "large"',
          defaultValue: "'middle'",
          desc: {
            'zh-CN': '<p>按钮大小</p>',
            'en-US': 'size',
          },
          demoId: 'button-size',
        },
      ],
    },
  ],
};
