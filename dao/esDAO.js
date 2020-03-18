var {
    Client
} = require('@elastic/elasticsearch');
const client = new Client({
    node: 'http://localhost:9205'
})
const {
    SqlUserDetails
} = require('../dao/sqlDAO')
const sqlUser = new SqlUserDetails();
const {
    UserClass
} = require('../abstract/userClass')

class ElkUserDetails extends UserClass {
    constructor() {
        super();
        this.datasource = 'elasticsearch'
    }
    addUserDetails(userData) {
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
                } = await client.search({
                    index: '.skedler',
                    body: query,

                });
                var userData = body.hits.hits.map(data => data._source)
                resolve(userData);
            } catch (e) {
                reject(e)
            }
        })
    }
    updateUserDetails(userData, id) {
        return new Promise(async (resolve, reject) => {
            try {
                userData.type = 'user';
                // var id = userData.id;
                delete userData.id;
                var {
                    body
                } = await client.update({

                    index: '.skedler',
                    body: userData,
                    id: id

                });
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
module.exports.ElkUserDetails = ElkUserDetails;