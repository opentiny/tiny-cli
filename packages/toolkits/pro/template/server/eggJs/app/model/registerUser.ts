/* indent size: 4 */

module.exports = (app: any) => {
  const DataTypes = app.Sequelize;

  const RegisterUser = app.model.define(
    'RegisterUser',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      loginType: {
        type: DataTypes.ENUM('account', 'email'),
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
