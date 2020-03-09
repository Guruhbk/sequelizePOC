var Sequelize = require('sequelize');
var fs = require('fs');
var data = {
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    password: 'janedoe123',
    org: 'skedler',
    role: 'engineer'
}

var user;
var seq;
var path = '/home/guidanz-guru/sequelizePOC/skedler.db'
class sqlUserDetails {
    constructor() {
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
                        this.user.sync({force: true}).then(()=>this.user.create(data).then(value => {
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
                        this.user.count().then(count => {
                            if (count) {
                                var query = 'SELECT * from users';
                                sequelize.sync()
                                    .then(() => sequelize.query(query).then(function(value) {
                                        resolve(value[0])
                                    })).catch(function(err) {
                                        reject(err)
                                    })
                            } else {
                                resolve([]);
                            }
                        }).catch(err => {
                            reject(err);
                        }));
            });
        });

    }
    updateUserDetails(){
        return new Promise((resolve, reject) => {
            this.dbConnect().then((sequelize) => {
                sequelize.sync()
                    .then(() =>
                        this.user.count().then(count => {
                            if (count) {
                                var query = 'SELECT * from users';
                                sequelize.sync()
                                    .then(() => sequelize.query(query).then(function(value) {
                                        resolve(value[0])
                                    })).catch(function(err) {
                                        reject(err)
                                    })
                            } else {
                                resolve([]);
                            }
                        }).catch(err => {
                            reject(err);
                        }));
            });
        });
    }
    deleteUserDetails(id){
        return new Promise((resolve, reject) => {
            this.dbConnect().then((sequelize) => {
                sequelize.sync()
                    .then(() =>
                        this.user.count().then(count => {
                            if (count) {
                                console.log('@@@@@@@@@@@@@@',id)
                                sequelize.sync()
                                    .then(() => this.user.destroy({
                                          where: {
                                            id: id
                                          }
                                        }).then(function(value) {
                                        resolve(value[0])
                                    })).catch(function(err) {
                                        reject(err)
                                    })
                            } else {
                                resolve([]);
                            }
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
module.exports.sqlUserDetails = sqlUserDetails
// exports userDetails;

// dbConnect.then(function(sequelize) {


//     // user = sequelize.define('users', {

//     //     // Model attributes are defined here
//     //     firstName: {
//     //         type: Sequelize.STRING,
//     //         allowNull: false
//     //     },
//     //     lastName: {
//     //         type: Sequelize.STRING
//     //         // allowNull defaults to true
//     //     },
//     //     username: {
//     //         type: Sequelize.STRING,
//     //         allowNull: false
//     //     },
//     //     password: {
//     //         type: Sequelize.STRING,
//     //         allowNull: false
//     //     },
//     //     org: {
//     //         type: Sequelize.STRING,
//     //         allowNull: false
//     //     },
//     //     role: {
//     //         type: Sequelize.STRING,
//     //         allowNull: false
//     //     },
//     // });

//     // async function test() {
//     //     try {
//     //         // var User = require('./model').users

//     //         // await sequelize.authenticate();
//     //         sequelize.sync()
//     //             .then(() => user.create(data).then(function(value) {
//     //                 console.log('value ', value)
//     //             })).catch(function(err) {
//     //                 console.log('##### ', err)
//     //             })

//     //         // const user = User.build({ firstName: 'Jane', lastName: 'Doe' });
//     //         // await user.save()
//     //     } catch (error) {
//     //         console.error('Unable to connect to the database:', error);
//     //     }
//     // }
//     // test();
//      function getUserDetails() {
//         new Promise(function(resolve, reject) {
//             sequelize.sync()
//                 .then(() =>
//                     user.count().then(count => {
//                         if (count) {
//                             var query = 'SELECT * from users';
//                             sequelize.sync()
//                                 .then(() => sequelize.query(query).then(function(value) {
//                                     console.log('value ', value[0])
//                                     resolve(value[0])
//                                 })).catch(function(err) {
//                                     console.log('##### ', err)
//                                     reject(err)
//                                 })
//                         }else{
//                          resolve([]);
//                         }
//                     }));
//         })

//     }
//     exports.getUserDetails = getUserDetails;
// })