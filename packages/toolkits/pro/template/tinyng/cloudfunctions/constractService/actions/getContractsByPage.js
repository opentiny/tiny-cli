const { Op } = require('sequelize');
const { useParser } = require('../tools/useParser.js');
const { useOrm } = require('../tools/useOrm.js');
const { ContractModel } = require('../Model/ContractModel.js');
const { config } = require('../db-config.js');

exports.main = async (event, context) => {
  const { body, response } = useParser(event, context);
  // body传入： {query,pagesize,pagenum}  pagenum从1开始
  const info = JSON.parse(body);
  const { define } = await useOrm(config.db1);
  const contractModel = define('Contract', ContractModel);
  await contractModel.sync();
  const contracts = await contractModel.findAndCountAll({
    where: {
      [info.field]: {
        [Op.like]: `%${info.query}%`,
      },
    },
    offset: info.pagesize * (info.pagenum - 1),
    limit: info.pagesize,
  });

  return response(200, contracts);
};
