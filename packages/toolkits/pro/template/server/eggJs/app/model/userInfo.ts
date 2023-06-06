/* indent size: 4 */

module.exports = (app: any) => {
  const DataTypes = app.Sequelize;

  const UserInfo = app.model.define(
    'UserInfo',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: '',
      },
      employeeType: {
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      roles: {
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      probationStart: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      probationEnd: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      probationDuration: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        defaultValue: null,
      },
      protocolStart: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      protocolEnd: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      status: {
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
    },
    {
      tableName: 'userinfo',
      underscored: false,
      freezeTableName: true,
      omitNull: false,
      timestamps: false,
      paranoid: false,
    },
  );

  return UserInfo;
};
