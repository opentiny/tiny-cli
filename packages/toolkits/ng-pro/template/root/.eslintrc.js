module.exports = {
  extends: ['@cloud/eslint-config-cbc/angular'],
  globals: {
    // 这里填入你的项目需要的全局变量rm -
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // jQuery: false,
    // $: true,
  },
  rules: {
        // 允许在参数，变量和属性上进行显式类型声明
        '@typescript-eslint/no-inferrable-types' : 'off',
        'no-inferrable-types': 'off',
        // angular场景下，constructor为空的情况很多，也是官方推荐的用法
        '@typescript-eslint/no-useless-constructor': 'off',
        'no-useless-constructor': 'off',
        // 函数的参数禁止超过 5 个，不适合angular场景
        'max-params': 'off',
        // 在定义变量之前就使用
        '@typescript-eslint/no-use-before-define': 'off',
        'no-use-before-define': 'off',
        // 禁止使用 Array 构造函数
        '@typescript-eslint/no-array-constructor': 'off',
        'no-array-constructor': 'off',
        // 使用 RegExp#exec 而不是 String#match
        '@typescript-eslint/prefer-regexp-exec': 'off',
        'prefer-regex-literals': 'off',
        // 消除参数顺序告警（eslint）
        '@typescript-eslint/member-ordering': 'off',
        'member-ordering': 'off',
        // 禁止给类的构造函数的参数添加修饰符
        '@typescript-eslint/no-parameter-properties': 'off',
        'no-parameter-properties': 'off',
        // 使用imports而不是require
        '@typescript-eslint/no-require-imports': 'off',
        'no-require-imports': 'off',
        // // 一个缩进必须用两个空格替代
        // 'indent': [
        //     'error',
        //     2,
        //     {
        //         SwitchCase: 1,
        //         flatTernaryExpressions: true
        //     }
        // ]
        // // 一个缩进必须用两个空格替代
        // '@typescript-eslint/indent': [
        //     'error',
        //     2,
        //     {
        //         SwitchCase: 1,
        //         flatTernaryExpressions: true
        //     }
        // ]
  }
};
