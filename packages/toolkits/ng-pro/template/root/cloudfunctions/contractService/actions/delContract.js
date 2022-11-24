const { useApigParser } = require('../tools/useApigParser.js');
const { useOrm } = require('../tools/useOrm.js');
const { ContractModel } = require('../Model/ContractModel.js');
const { config } = require('../db-config.js');

exports.operationDb = async (event, context) => {
  const { body, response } = useApigParser(event, context);
  // body传入： {id}
  const info = JSON.parse(body);
  const { define } = await useOrm(config.db1);

  const contractModel = define('Contract', ContractModel);
  await contractModel.destroy({
    where: {
      id: info.id,
    },
  });

  return response(200, 'success');
};
