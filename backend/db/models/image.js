'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(
        models.User, {foreignKey:'userId'});

      Image.belongsTo(
        models.Spot, {foreignKey:'spotId'});

      Image.belongsTo(
        models.Review, {foreignKey:'reviewId'});
    }
  }
  Image.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Spots',
        key: 'id'
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Reviews',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Users',
        key: 'id'
      }
    },
    url: DataTypes.TEXT,
    previewImage: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
