module.exports = {
  toolkit: '@opentiny/tiny-toolkit-dev',
  tasks: {
    start: [
      // 此处命令配置是用于dev套件本地开发
      { command: 'npm run watch' }
    ],
    build: [
      { command: 'npm run build' }
    ]
  }
};
