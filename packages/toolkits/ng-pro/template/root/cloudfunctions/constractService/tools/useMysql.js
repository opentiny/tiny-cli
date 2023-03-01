const mysql = require('mysql2/promise');

/** 需要引入mysql2_seq 的依赖包 */
exports.useMysql = async (dbConfig) => {
  const config = { ...dbConfig, password: Buffer.from(dbConfig.password, 'base64').toString('ascii') };
  const connection = await mysql.createConnection(config);

  // 参考：https://github.com/sidorares/node-mysql2/tree/master/documentation_zh-cn#%E6%96%87%E6%A1%A3
  function rawSql(sql, params = []) {
    return connection.execute(sql, params);
  }
  // 事务操作。异常时,自动rollback，并回调logger函数！
  const transaction = async (fn, logFn) => {
    await connection.beginTransaction();
    try {
      await fn();
      await connection.commit();
    } catch (error) {
      logFn && logFn(error);
      await connection.rollback();
    }
  };
  return { connection, rawSql, transaction };
};
