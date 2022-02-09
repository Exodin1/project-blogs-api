module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostsCategory', {}, { timestamps: false });
  PostCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogPosts',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostCategories;
};
