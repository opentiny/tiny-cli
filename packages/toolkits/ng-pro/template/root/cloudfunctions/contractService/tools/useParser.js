/** 为Apig环境，解析出常用变量！ */
exports.useApigParser = function (event, context) {
  //1、解析query
  const query = event.queryStringParameters;
  const pathParams = event.pathParameters;
  //2、解析header
  const headers = event.headers;
  //3、解析body
  const body = Buffer.from(event.body || '', 'base64').toString();
  //4、解析环境变量
  const getByProp = (_, propKey) => context.getUserData(propKey);
  const env = new Proxy({}, { get: getByProp });
  //5、获得logger
  const logger = context.getLogger();
  // 6、获取其它有效信息
  const ctx = {
    // ak,sk,token 需要委托，且授权包含“FunctionGraph Administrator”或“Tenant Administrator”权限， 以及其它服务的授权！
    ak: context.getAccessKey(),
    sk: context.getSecretKey(),
    token: context.getToken(), // 传入头：  x-auth-token， 可以相互调用！
    projectId: context.getProjectID(),
    package: context.getPackage(),
    funName: context.getFunctionName(),
    version: context.getVersion(),
    requestId: context.getRequestID(),
  };

  // 7、响应函数
  const response = (code, strOrObj) => ({
    statusCode: code,
    headers: { 'Content-Type': 'application/json' },
    isBase64Encoded: false,
    body: JSON.stringify({ data: strOrObj, timestamp: new Date() }),
  });

  return {
    query,
    pathParams,
    headers,
    body,
    env,
    logger,
    ctx,
    response,
  };
};
