const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Score extends Model {}
  
  Score.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'user',
        key: 'id',
        },
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'course',
        key: 'id',
        },
    },
  },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'score',
    }
  );
  
  module.exports = Score;