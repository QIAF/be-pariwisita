'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Destination.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    destination_picture:{
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        defaultValue: "default.png",
      },
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};