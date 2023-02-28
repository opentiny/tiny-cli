module.exports = {
  extends: 'eslint:recommended',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  globals: {
    document: true,
    window: true
  },
  rules: {
    'semi': 1, // 语句分号结尾
    'quotes': [0, 'single'], // 单引号
    'no-return-assign': 1, // return 语句中不能有赋值表达式
    "no-undef": 0, // 不能有未定义的变量
    "no-unused-vars": 0, // 不能有声明后未被使用的变量或参数
    "no-empty": 0, // 块语句中的内容不能为空
    "eqeqeq": 1, // 必须使用全等
  }
};
