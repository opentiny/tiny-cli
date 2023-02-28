module.exports = {
  toolkit: '@opentiny/tiny-toolkit-dev',
  tasks: {
    // 此处命令配置是用于dev套件开发
    start: [
      { command: 'npm run watch' }
    ],
    build: [
      { command: 'npm run build' }
    ]
  }
};
