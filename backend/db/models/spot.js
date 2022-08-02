'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User, {foreignKey:'ownerId'});

      Spot.hasMany(
        models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true});

      Spot.hasMany(
        models.Image, {foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true})

      Spot.hasMany(
        models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Users',
        key: 'id'
      }
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type: DataTypes.DECIMAL(8,6),
    },
    lng: {
      type: DataTypes.DECIMAL(9,6),
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(6,2)
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
