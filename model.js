var Sequelize = require('sequelize');
var user;
var seq;
var path = '/home/guidanz-guru/sequelizePOC/skedler.db'
 var sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: path,
    logging: (msg) => console.log(msg),
    operatorsAliases: false
});
   user = sequelize.define('users', {
         
  // Model attributes are defined here
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  org: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
});
exports.user = user;
