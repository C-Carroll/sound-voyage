'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: "userId"})
      Review.belongsTo(models.Album, {foreignKey: "albumId"})
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    ratingDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
