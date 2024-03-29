'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.Library, {foreignKey: "ownedSongId"})
      Song.belongsTo(models.Album, {foreignKey: "albumId"})
      Song.belongsTo(models.Artist, {foreignKey: "artistId"})
    }
  }
  Song.init({
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    songName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    songUrl: DataTypes.STRING,
    isExplicit: DataTypes.BOOLEAN,
    uid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
