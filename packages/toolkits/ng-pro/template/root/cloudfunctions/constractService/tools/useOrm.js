const Sequelize = require('sequelize');

exports.useOrm = async (dbConfig) => {
  const connection = new Sequelize(dbConfig.database, dbConfig.user, Buffer.from(dbConfig.password, 'base64').toString('ascii'), {
    host: dbConfig.host,
    dialect: 'mysql',
    port: dbConfig.port,
  });

  // 参考：https://sequelize.org/docs/v6/core-concepts/raw-queries/#replacements  ?占位 或 :name 占位
  function rawSql(sql, params = []) {
    return connection.query(sql, { replacements: params });
  }
  // 事务操作。异常时,自动rollback，并回调logger函数！
  const transaction = async (fn, logFn) => {
    const t = await connection.transaction();
    try {
      await fn(t);
      await t.commit();
    } catch (error) {
      logFn && logFn(error);
      await t.rollback();
    }
  };
  // 定义一个 Orm 模型，
  const define = (modelName, modelDefine, tableName = '') => {
    tableName = tableName || modelName;
    return connection.define(modelName, modelDefine, { tableName });
  };
  return { connection, rawSql, transaction, define };
};
