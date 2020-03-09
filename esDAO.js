var {
    Client
} = require('@elastic/elasticsearch');
const client = new Client({
    node: 'http://localhost:9205'
})
const {
    sqlUserDetails
} = require('./sqlDAO')
const sqlUser = new sqlUserDetails();


class elkUserDetails {
    migrateUserDetails() {
        return new Promise(async (resolve, reject) => {
            try {
                var data = await sqlUser.getUserDetails();
                for (var userData of data) {
                    // console.log('user ',user)
                    userData.type = 'user';
                    var {
                        body
                    } = await client.index({

                        index: '.skedler',
                        body: userData,
                        id: userData.id

                    });
                }
                await sqlUser.dropUserDetails();
                resolve('success');
            } catch (e) {
                reject(e)
            }
        })
    }
    addUserDetails(userData){
        return new Promise(async (resolve, reject) => {
            try {
                    userData.type = 'user';
                    var {
                        body
                    } = await client.index({
                        index: '.skedler',
                        body: userData,

                    });
                resolve('success');
            } catch (e) {
                reject(e)
            }
        })

    }
    getUserDetails() {
        return new Promise(async (resolve, reject) => {
            try {
                var query = {
                    "query": {
                        "term": {
                            "type": {
                                "value": "user"
                            }
                        }
                    }
                }
                var {
                    body
                } = await client.get({
                    index: '.skedler',
                    body: query,
                    // id:userData.id

                });

                await sqlUser.dropUserDetails();
                resolve('success');
            } catch (e) {
                reject(e)
            }
        })
    }
    updateUserDetails(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                // for (var userData of data) {
                    // console.log('user ',user)
                    userData.type = 'user';
                    var id = userData.id;
                    delete userData.id;
                    var {
                        body
                    } = await client.update({

                        index: '.skedler',
                        body: userData,
                        id: id

                    });
                // }
                // await sqlUser.dropUserDetails();
                resolve('success');
            } catch (e) {
                reject(e)
            }
        })
    }
    deleteUserDetails(id) {
        return new Promise(async (resolve, reject) => {
            try {
                    var {
                        body
                    } = await client.delete({
                        index: '.skedler',
                        // body: userData,
                        id: id

                    });                
                resolve('success');
            } catch (e) {
                reject(e)
            }
        })
    }
}
module.exports.elkUserDetails = elkUserDetails;

// async function migrateUserData() {
//     return new Promise(async (resolve, reject) => {
//         try{
//         var data = await sqlUser.getUserDetails();
//         for (var userData of data) {
//             // console.log('user ',user)
//             userData.type = 'user';
//             var {
//                 body
//             } = await client.index({

//                 index: '.skedler',
//                 body: userData,
//                 id:userData.id

//             });
//         }
//         await sqlUser.dropUserDetails();
//         resolve('success');
//     }catch(e){
//         reject(e)
//     }
//     })
// }
// async function getUserDetails() {
//     return new Promise(async (resolve, reject) => {
//         try{
//             var query =  {
//                   "query": {
//                     "term": {
//                       "type": {
//                         "value": "user"
//                       }
//                     }
//                   }
//                 }
//             var {
//                 body
//             } = await client.get({
//                 index: '.skedler',
//                 body: query,
//                 // id:userData.id

//             });

//         await sqlUser.dropUserDetails();
//         resolve('success');
//     }catch(e){
//         reject(e)
//     }
//     })
// }
// async function updateUserData() {
//     return new Promise(async (resolve, reject) => {
//         try{
//         var data = await sqlUser.getUserDetails();
//         for (var userData of data) {
//             // console.log('user ',user)
//             userData.type = 'user';
//             var id = userData.id;
//             delete userData.id;
//             var {
//                 body
//             } = await client.update({

//                 index: '.skedler',
//                 body: userData,
//                 id:id

//             });
//         }
//         await sqlUser.dropUserDetails();
//         resolve('success');
//     }catch(e){
//         reject(e)
//     }
//     })
// }
// async function deleteUserData() {
//     return new Promise(async (resolve, reject) => {
//         try{
//         var data = await sqlUser.getUserDetails();
//         for (var userData of data) {
//             // console.log('user ',user)
//             userData.type = 'user';
//             var {
//                 body
//             } = await client.delete({

//                 index: '.skedler',
//                 // body: userData,
//                 id:userData.id

//             });
//         }
//         await sqlUser.dropUserDetails();
//         resolve('success');
//     }catch(e){
//         reject(e)
//     }
//     })
// }
// module.exports.updateUserData = updateUserData;
// module.exports.deleteUserData = deleteUserData;
// module.exports.migrateUserData = migrateUserData;

// migrate()