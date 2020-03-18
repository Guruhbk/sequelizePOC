var Sequelize = require('sequelize');
var fs = require('fs');
const {
    UserClass
} = require('../abstract/userClass')

var user;
var seq;
var path = '/home/guidanz-guru/sequelizePOC/skedler.db'
class SqlUserDetails extends UserClass {
    constructor() {
        super();
        this.datasource = 'sqlite';
        this.dbConnect().then((sequelize) => {
            this.user = sequelize.define('users', {

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
        })

    }
    dbConnect() {
        return new Promise(function(resolve, reject) {
            if (!fs.existsSync(path)) {
                fs.createWriteStream(path);
                fs.chmod(path, 511, function(err) {
                    if (err) {
                        resolve()
                    } else {
                        console.log("database file created successfully");
                        var seq = new Sequelize(null, null, null, {
                            dialect: 'sqlite',
                            storage: path,
                            logging: (msg) => console.log(msg),
                            operatorsAliases: false
                        });
                        resolve(seq);
                    }
                });
                /*}
                });*/
            } else {
                var seq = new Sequelize(null, null, null, {
                    dialect: 'sqlite',
                    storage: path,
                    logging: (msg) => console.log(msg),
                    operatorsAliases: false
                });
                resolve(seq);
            }
        });
    }

    addUserDetails(data) {
        return new Promise((resolve, reject) => {

            this.dbConnect().then(sequelize => {
                sequelize.sync()
                    .then(() =>
                        this.user.sync().then(() => this.user.create(data).then(value => {
                            resolve(value)
                        }))).catch(function(err) {
                        reject(err)
                    })
            });
        });
    }
    getUserDetails() {
        return new Promise((resolve, reject) => {
            this.dbConnect().then((sequelize) => {
                sequelize.sync()
                    .then(() =>
                        this.user.sync().then(count => {
                            // if (count) {
                            var query = 'SELECT * from users';
                            sequelize.sync()
                                .then(() => sequelize.query(query).then(function(value) {
                                    resolve(value[0])
                                })).catch(function(err) {
                                    reject(err)
                                })
                        }).catch(err => {
                            reject(err);
                        }));
            });
        });

    }
    updateUserDetails(data, id) {
        return new Promise((resolve, reject) => {
            this.dbConnect().then((sequelize) => {
                sequelize.sync()
                    .then(() =>
                        this.user.sync().then(() => {
                            this.user.update(data, {
                                where: {
                                    id: id
                                }
                            }).then(function(value) {
                                resolve(value)
                            }).catch(function(err) {
                                reject(err)
                            })

                        }).catch(err => {
                            reject(err);
                        }));
            });
        });
    }
    deleteUserDetails(id) {
        return new Promise((resolve, reject) => {
            this.dbConnect().then((sequelize) => {
                sequelize.sync()
                    .then(() =>
                        this.user.sync().then(() => {
                            this.user.destroy({
                                where: {
                                    id: id
                                }
                            }).then(function(value) {
                                resolve(value[0])
                            }).catch(function(err) {
                                reject(err)
                            })
                            // } else {
                            //     resolve([]);
                            // }
                        }).catch(err => {
                            reject(err);
                        }));
            });
        });
    }
    dropUserDetails() {
        return this.user.drop();
    }
}
module.exports.SqlUserDetails = SqlUserDetails