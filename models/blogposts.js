module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    sequelize, timestamps: false, tableName: 'BlogPosts',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return BlogPosts;
};