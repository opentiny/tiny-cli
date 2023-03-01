const { useParser } = require('./tools/useParser');

exports.handler = async (event, context) => {
  const { query, response } = useParser(event, context);
  const { main } = require(`./actions/${query.fn_name}.js`);

  if (main) {
    const ret = await main(event, context);
    return ret;
  } else {
    return response(200, '输入的fn_name不匹配！');
  }
};
