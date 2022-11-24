const { useApigParser } = require('./tools/useApigParser');

exports.handler = async (event, context) => {
  const { query, response } = useApigParser(event, context);
  const { operationDb } = require(`./actions/${query.fn_name}.js`);

  if (operationDb) {
    const ret = await operationDb(event, context);
    return ret;
  } else {
    return response(200, '输入的fn_name不匹配！');
  }
};
