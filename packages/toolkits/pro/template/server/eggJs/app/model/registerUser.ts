/* indent size: 4 */

module.exports = (app: any) => {
  const DataTypes = app.Sequelize;

  const RegisterUser = app.model.define(
    'RegisterUser',
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
      password: {
        field: 'password',
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      registerType: {
        field: 'register_type',
        type: DataTypes.ENUM('email'),
        allowNull: false,
        defaultValue: 'email',
      },
    },
    {
      tableName: 'registeruser',
      underscored: false,
      freezeTableName: true,
      omitNull: false,
      timestamps: false,
      paranoid: false,
    },
  );

  return RegisterUser;
};
