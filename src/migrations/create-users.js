'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
  "id": {
    "type": Sequelize.INTEGER,
    "autoIncrement": true,
    "primaryKey": true
  },
  "firstName": {
    "type": Sequelize.STRING,
    "trim": true,
    "allowNull": false
  },
  "isSuperUser": {
    "type": Sequelize.BOOLEAN,
    "defaultValue": false
  },
  "role": {
    "type": Sequelize.ENUM,
    "values": [
      "las",
      "admin",
      "hostess",
      "superuser",
    ]
  },
  "lastName": {
    "type": Sequelize.STRING,
    "allowNull": true
  },
  "email": {
    "type": Sequelize.STRING,
    "unique": true,
    "allowNull": true
  },
  "password": {
    "type": Sequelize.STRING
  },
  "isEnabled": {
    "type": Sequelize.BOOLEAN,
    "defaultValue": true
  },
  "isVerified": {
    "type": Sequelize.BOOLEAN,
    "defaultValue": false
  },
  "createdAt": {
    "type": Sequelize.DATE,
    "allowNull": false
  },
  "updatedAt": {
    "type": Sequelize.DATE,
    "allowNull": false
  }
});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};