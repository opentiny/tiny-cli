/* indent size: 4 */

module.exports = (app: any) => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'employee',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(16),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      employeeNo: {
        field: 'employee_no',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department: {
        field: 'department',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      departmentLevel: {
        field: 'department_level',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        field: 'status',
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      workbenchName: {
        field: 'workbench_name',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      project: {
        field: 'project',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      type: {
        field: 'type',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        field: 'address',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      roles: {
        field: 'roles',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastUpdateUser: {
        field: 'last_update_user',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createTime: {
        field: 'create_time',
        type: DataTypes.TIME,
        allowNull: true,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'employee',
      underscored: false,
      freezeTableName: true,
      omitNull: false,
      timestamps: false,
      paranoid: false,
    },
  );

  return Model;
};
