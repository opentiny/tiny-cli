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
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: '',
      },
      employee_type: {
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      roles: {
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      probation_start: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      probation_end: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      probation_duration: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        defaultValue: null,
      },
      protocol_start: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      protocol_end: {
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
