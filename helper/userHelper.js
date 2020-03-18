const {
    SqlUserDetails
} = require('../dao/sqlDAO')
const sqlUser = new SqlUserDetails();
const {
    ElkUserDetails
} = require('../dao/esDAO');
const elkUser = new ElkUserDetails();


class UserDetails {
    constructor(...datasources) {
        console.log('datasources ', datasources)
        this._datasources = datasources.reduce((accumulator, item) => {
            accumulator[item.datasource] = item;
            return accumulator;
        }, {})
        console.log('this._datasources ', this._datasources)
    }
    getUserDetails(datasource) {
        console.log('datasource ', this._datasources)
        if (this._datasources.hasOwnProperty(datasource)) {
            return this._datasources[datasource].getUserDetails();
        }
        throw 'Unknown datasource type.'
    }

    addUserDetails(datasource, data) {
        if (this._datasources.hasOwnProperty(datasource)) {
            return this._datasources[datasource].addUserDetails(data);
        }
        throw 'Unknown datasource type.'
    }
    updateUserDetails(datasource, data, id) {
        if (this._datasources.hasOwnProperty(datasource)) {
            return this._datasources[datasource].updateUserDetails(data, id);
        }
        throw 'Unknown datasource type.'
    }
    deleteUserDetails(datasource, id) {
        if (this._datasources.hasOwnProperty(datasource)) {
            return this._datasources[datasource].deleteUserDetails(id);
        }
        throw 'Unknown datasource type.'
    }
}
const userDetails = new UserDetails(new SqlUserDetails(), new ElkUserDetails());
module.exports.userDetails = userDetails;