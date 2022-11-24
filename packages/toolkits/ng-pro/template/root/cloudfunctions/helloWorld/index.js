exports.handler = async (event, context) => {
  const output = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    isBase64Encoded: false,
    body: 'Hello World From Huawei Cloud!'
  };

  return output;
};
