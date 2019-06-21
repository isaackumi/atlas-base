const { models } = require('../dist/models')
const fs = require('fs')


// console.log(models)

for(let model in models) {
  // console.log(model)
  let attributes = models[model].rawAttributes;
  console.log(attributes)

  for(let column in attributes) {
    // console.log(attributes[column].type.key)
    delete attributes[column].Model;
    delete attributes[column].fieldName;
    delete attributes[column].field;
    attributes[column]['type'] = `Sequelize.${attributes[column].type.key}`
    for(let property in attributes[column]) {
      if(property.startsWith('_')) {
        delete attributes[column][property];
      }
    }
  }

  let schema = JSON.stringify(attributes, null, 2);
  let tableName = models[model].tableName;

  let template = `'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('${tableName}', ${schema});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('${tableName}');
  }
};`

  if(models[model].tableName !== undefined) {
    fs.writeFileSync('./tmp/' + models[model].tableName + '.js', template);
  }

};