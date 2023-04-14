export default {
  column: '2',
  demos: [
    {
      demoId: 'buttongroup-items',
      name: {
        'zh-CN': '基本使用',
        'en-US': '',
      },
      desc: {
        'zh-CN': 'Buttongroup 组件的最简用法。默认单选。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.items', 'TiButtonItem.properties.text'],
      tag: 'website-tiny-buttongroup-items',
      codeFiles: ['buttongroup-items.html', 'ButtongroupItemsComponent.ts'],
    },
    {
      demoId: 'buttongroup-multiple',
      name: {
        'zh-CN': '多选',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>multiple</code>配置为多选选块组，注意 ngModel 绑定值为数组。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.multiple'],
      tag: 'website-tiny-buttongroup-multiple',
      codeFiles: ['buttongroup-multiple.html', 'ButtongroupMultipleComponent.ts'],
    },
    {
      demoId: 'buttongroup-radio-type',
      name: {
        'zh-CN': '不同样式的单选选块组',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>type</code>属性配置选块样式，默认为<code>large</code>，包括<code>large</code>、<code>small</code>、<code>noBorder</code>三种类型。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.type'],
      tag: 'website-tiny-buttongroup-radio-type',
      codeFiles: ['buttongroup-radio-type.html', 'ButtongroupRadioTypeComponent.ts'],
    },
    {
      demoId: 'buttongroup-multi-type',
      name: {
        'zh-CN': '不同大小的多选选块组',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>type</code>属性配置选块样式，默认为<code>large</code>，包括<code>large</code>、<code>small</code>两种类型。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.type'],
      tag: 'website-tiny-buttongroup-multi-type',
      codeFiles: ['buttongroup-multi-type.html', 'ButtongroupMultiTypeComponent.ts'],
    },
    {
      demoId: 'buttongroup-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过属性<code>disabled</code>配置整体是否为禁用状态，仅限于单选模式；通过<code>items.disabled</code>配置单个选块是否为禁用状态。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.disabled', 'TiButtonItem.properties.disabled'],
      tag: 'website-tiny-buttongroup-disabled',
      codeFiles: ['buttongroup-disabled.html', 'ButtongroupDisabledComponent.ts'],
    },
    {
      demoId: 'buttongroup-valuekey',
      name: {
        'zh-CN': '选中值是一个基本类型数据',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>valueKey</code>配置选中值是一个基本类型的数据，而不是默认的引用类型。<code>valueKey</code>传入<code>item</code>对象某个键名，选中值即为该键名的值。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.valueKey'],
      tag: 'website-tiny-buttongroup-valuekey',
      codeFiles: ['buttongroup-valuekey.html', 'ButtongroupValuekeyComponent.ts'],
    },
    {
      demoId: 'buttongroup-sup',
      name: {
        'zh-CN': '选块角标',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>#sup</code>模板配置选块角标。角标样式由业务自定义，不提供公共样式。如果不显示，排查是否设置<code>encapsulation: ViewEncapsulation.None</code>。</p>',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.slots.supTemplate'],
      tag: 'website-tiny-buttongroup-sup',
      codeFiles: ['buttongroup-sup.html', 'ButtongroupSupComponent.ts'],
    },
    {
      demoId: 'buttongroup-deselectable',
      name: {
        'zh-CN': '取消单选选中',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>deselectable</code>属性配置是否可以取消选中，仅限于单选模式。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.deselectable'],
      tag: 'website-tiny-buttongroup-deselectable',
      codeFiles: ['buttongroup-deselectable.html', 'ButtongroupDeselectableComponent.ts'],
    },
    {
      demoId: 'buttongroup-minwidth',
      name: {
        'zh-CN': '每个选块的最小宽度',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>minwidth</code>配置每个选块的最小宽度。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.minWidth'],
      tag: 'website-tiny-buttongroup-minwidth',
      codeFiles: ['buttongroup-minwidth.html', 'ButtongroupMinwidthComponent.ts'],
    },
    {
      demoId: 'buttongroup-template',
      name: {
        'zh-CN': '自定义内容',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>#item</code>模板配置选块内容。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.slots.itemTemplate'],
      tag: 'website-tiny-buttongroup-template',
      codeFiles: ['buttongroup-template.html', 'ButtongroupTemplateComponent.ts'],
    },
    {
      demoId: 'buttongroup-tip',
      name: {
        'zh-CN': '添加 tip 提示',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>items.tipContent</code>配置提示信息，10.1.1 版本起，tip 接口的类型扩展为：string | TemplateRef<any> | Component<any>，旧版本为：string。通过<code>items.tipPosition</code>配置提示信息方位。超长文本以 title 显示，不建议使用 tip 提示。',
        'en-US': '',
      },
      apis: ['TiButtonItem.properties.tipContent', 'TiButtonItem.properties.tipPosition'],
      tag: 'website-tiny-buttongroup-tip',
      codeFiles: ['buttongroup-tip.html', 'ButtongroupTipComponent.ts'],
    },
    {
      demoId: 'buttongroup-multiline',
      name: {
        'zh-CN': '较多的选块折行显示',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>multiline</code>配置多个选块在折行显示时有行间距。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.multiline'],
      tag: 'website-tiny-buttongroup-multiline',
      codeFiles: ['buttongroup-multiline.html', 'ButtongroupMultilineComponent.ts'],
    },
    {
      demoId: 'buttongroup-beforeclick',
      name: {
        'zh-CN': 'beforeClick事件',
        'en-US': '',
      },
      desc: {
        'zh-CN': '按下非禁用的选块时触发的回调，参数为当前选块<code>item</code>，是否选中由业务处理，一般用于阻止选中。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.events.beforeClick'],
      tag: 'website-tiny-buttongroup-beforeclick',
      codeFiles: ['buttongroup-beforeclick.html', 'ButtongroupBeforeclickComponent.ts'],
    },
  ],
  apis: [
    {
      name: 'TiButtongroupComponent',
      type: 'component',
      properties: [
        {
          name: 'activeClass',
          type: 'string',
          desc: {
            'zh-CN': '<p>激活状态项样式类定义</p>',
            'en-US': 'activeClass',
          },
        },
        {
          name: 'deselectable',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '<p>单选选块组选中后再次点击是否可以取消选中</p>',
            'en-US': 'deselectable',
          },
          demoId: 'buttongroup-deselectable',
        },
        {
          name: 'items',
          type: 'Array&lt;<a href="#TiButtonItem">TiButtonItem</a>&gt;',
          desc: {
            'zh-CN': '<p>选块组的数据</p>',
            'en-US': 'items',
          },
          demoId: 'buttongroup-items',
        },
        {
          name: 'minWidth',
          type: 'string',
          desc: {
            'zh-CN': '<p>单个选块的最小宽度</p>',
            'en-US': 'minWidth',
          },
          demoId: 'buttongroup-minwidth',
        },
        {
          name: 'multiline',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '<p>选块是否为多行，多行时有行间距</p>',
            'en-US': 'multiline',
          },
          demoId: 'buttongroup-multiline',
        },
        {
          name: 'multiple',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '<p>是否为多选选块组</p>',
            'en-US': 'multiple',
          },
          demoId: 'buttongroup-multiple',
        },
        {
          name: 'type',
          type: 'string',
          defaultValue: "'large'",
          desc: {
            'zh-CN':
              '<p>选块的尺寸和间距</p><p>单选选块可选值包括 &#39;large&#39;,&#39;small&#39;,&#39;noBorder&#39;；多选选块可选值包括 &#39;large&#39;,&#39;small&#39;。</p>',
            'en-US': 'type',
          },
          demoId: 'buttongroup-radio-type',
        },
        {
          name: 'valueKey',
          type: 'string',
          desc: {
            'zh-CN': '<p>指定选中项数据的键值</p>',
            'en-US': 'valueKey',
          },
          demoId: 'buttongroup-valuekey',
        },
        {
          name: 'disabled',
          type: 'boolean',
          desc: {
            'zh-CN': '<p>是否禁用</p>',
            'en-US': 'disabled',
          },
          demoId: 'buttongroup-disabled',
        },
        {
          name: 'tabindex',
          type: 'string',
          defaultValue: "'0'",
          desc: {
            'zh-CN': '<p>HTML 属性 tabindex</p>',
            'en-US': 'tabindex',
          },
        },
      ],
      events: [
        {
          name: 'beforeClick',
          type: 'EventEmitter&lt;<a href="#TiButtonItem">TiButtonItem</a>&gt;',
          defaultValue: 'new EventEmitter&lt;<a href="#TiButtonItem">TiButtonItem</a>&gt;()',
          desc: {
            'zh-CN': '<p>点击选块，数据选中前的回调事件</p>',
            'en-US': 'beforeClick',
          },
          demoId: 'buttongroup-beforeclick',
        },
        {
          name: 'blur',
          type: 'EventEmitter&lt;FocusEvent&gt;',
          defaultValue: 'new EventEmitter&lt;FocusEvent&gt;()',
          desc: {
            'zh-CN': '<p>HTML 事件 blur</p>',
            'en-US': 'blur',
          },
        },
        {
          name: 'focus',
          type: 'EventEmitter&lt;FocusEvent&gt;',
          defaultValue: 'new EventEmitter&lt;FocusEvent&gt;()',
          desc: {
            'zh-CN': '<p>HTML 事件 focus</p>',
            'en-US': 'focus',
          },
        },
      ],
      slots: [
        {
          name: 'itemTemplate',
          type: 'TemplateRef&lt;any&gt;',
          desc: {
            'zh-CN': '<p>选块内容区域的模板。</p>',
            'en-US': 'itemTemplate',
          },
          demoId: 'buttongroup-template',
        },
        {
          name: 'supTemplate',
          type: 'TemplateRef&lt;any&gt;',
          desc: {
            'zh-CN': '<p>选块角标区域的模板。</p>',
            'en-US': 'supTemplate',
          },
          demoId: 'buttongroup-sup',
        },
      ],
      methods: [
        {
          name: 'blur',
          type: '() =&gt; void',
          desc: {
            'zh-CN': '<p>给元素移除焦点</p>',
            'en-US': 'blur',
          },
        },
        {
          name: 'focus',
          type: '() =&gt; void',
          desc: {
            'zh-CN': '<p>给元素设置焦点</p>',
            'en-US': 'focus',
          },
        },
      ],
    },
    {
      name: 'TiButtonItem',
      type: 'interface',
      properties: [
        {
          name: 'disabled',
          type: 'boolean',
          desc: {
            'zh-CN': '<p>选块是否禁用</p>',
            'en-US': 'disabled',
          },
          demoId: 'buttongroup-disabled',
        },
        {
          name: 'show',
          type: 'boolean',
          desc: {
            'zh-CN': '<p>选块是否显示</p>',
            'en-US': 'show',
          },
        },
        {
          name: 'text',
          type: 'string',
          desc: {
            'zh-CN': '<p>选块显示的文本</p>',
            'en-US': 'text',
          },
          demoId: 'buttongroup-items',
        },
        {
          name: 'tipContent',
          type: 'string | TemplateRef&lt;any&gt; | any',
          desc: {
            'zh-CN': '<p>tip 提示内容</p>',
            'en-US': 'tipContent',
          },
          demoId: 'buttongroup-tip',
        },
        {
          name: 'tipPosition',
          type: 'string',
          desc: {
            'zh-CN': '<p>tip 提示方向</p>',
            'en-US': 'tipPosition',
          },
          demoId: 'buttongroup-tip',
        },
      ],
    },
  ],
};
