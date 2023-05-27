/* indent size: 4 */

module.exports = (app: any) => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define(
    'employee',
    {
      id: {
        type: DataTypes.INTEGER(16),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      employee_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      department_level: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      workbench_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      project: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      roles: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_update_user: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      create_time: {
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
