module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    displayName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'no image',
    },
  }, {
    timestamps: false,
    underscored: false,
    tableName: 'Users',
  });
  return Users;
}; 