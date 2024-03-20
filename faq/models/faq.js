'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FAQ extends Model {
    static associate(models) {
      // No associations in this example
    }
  }
  FAQ.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FAQ',
  });
  return FAQ;
};
