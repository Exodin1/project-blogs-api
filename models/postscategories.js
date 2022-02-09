module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });
  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(models.BlogPosts, { foreignKey: 'postId', as: 'post' });
    PostsCategories.belongsTo(models.Categories, { foreignKey: 'categoryId', as: 'category' });
  };
  return PostsCategories;
};
