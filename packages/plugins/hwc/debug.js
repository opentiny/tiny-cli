(async () => {
  const builder = await require('./dist/index').default;

  const param = {
    clientOptions: {},
    clientArgs: ['create']
  };

  builder.eip(param);
})();
