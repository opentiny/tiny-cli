const { Op } = require('sequelize');
const { useApigParser } = require('../tools/useApigParser.js');
const { useOrm } = require('../tools/useOrm.js');
const { ContractModel } = require('../Model/ContractModel.js');
const { config } = require('../db-config.js');

exports.operationDb = async (event, context) => {
  const { body, response } = useApigParser(event, context);
  // body传入{query, field}, query为查询的值, field为查询字段
  const info = JSON.parse(body);
  const { define } = await useOrm(config.db1);
  const contractModel = define('Contract', ContractModel);
  await contractModel.sync();
  const contracts = await contractModel.findAll({
    where: {
      [info.field]: {
        [Op.like]: `%${info.query || ''}%`,
      },
    },
  });

  return response(200, contracts);
};
