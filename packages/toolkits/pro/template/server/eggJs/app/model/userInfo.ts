/* indent size: 4 */

module.exports = (app: any) => {
  const DataTypes = app.Sequelize;

  const UserInfo = app.model.define(
    'UserInfo',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        field: 'user_name',
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER(20),
        allowNull: false,
      },
      department: {
        field: 'department',
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: '',
      },
      employeeType: {
        field: 'employee_type',
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      job: {
        field: 'job',
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      role: {
        field: 'role',
        type: DataTypes.STRING(32),
        defaultValue: 'user',
      },
      probationStart: {
        field: 'probation_start',
        type: DataTypes.DATE,
        defaultValue: null,
      },
      probationEnd: {
        field: 'probation_end',
        type: DataTypes.DATE,
        defaultValue: null,
      },
      probationDuration: {
        field: 'probation_duration',
        type: DataTypes.INTEGER(11).UNSIGNED,
        defaultValue: null,
      },
      protocolStart: {
        field: 'protocol_start',
        type: DataTypes.DATE,
        defaultValue: null,
      },
      protocolEnd: {
        field: 'protocol_end',
        type: DataTypes.DATE,
        defaultValue: null,
      },
      address: {
        field: 'address',
        type: DataTypes.STRING(32),
        defaultValue: null,
      },
      status: {
        field: 'status',
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
