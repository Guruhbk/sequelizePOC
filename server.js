const express = require('express');
const app = express();
const {
    sqlUserDetails
} = require('./sqlDAO')
const sqlUser = new sqlUserDetails();
const {
    elkUserDetails
} = require('./esDAO');
const elkUser = new elkUserDetails();
const bodyParser = require('body-parser');
const {
    migrateUserData
} = require('./esDAO');
const router = express.Router();
global.dataStore = 'sqlite'

// router.post('/signup', function(req, res) {
//     var data = req.body.data;
//     if (dataStore == 'sqlite') {
//         sqlUser.addUserDetails(data).then(value => {
//             res.send('Success')
//         }).catch(err => res.send(err))
//     } else {

//     }
// });
router.get('/getAllUsers',function(req,res){
	    if (dataStore == 'sqlite') {
        sqlUser.getUserDetails().then(value => {
            res.send(value)
        }).catch(err => res.send(err))
    } else {
        elkUser.getUserDetails().then(value => res.send('Success')).catch(err => res.send(err))
    }

})
router.post('/signup', function(req, res) {
    var data = req.body.data;
    console.log('signup ',dataStore)
    if (dataStore == 'sqlite') {
        sqlUser.addUserDetails(data).then(value => {
            res.send('Success')
        }).catch(err => res.send(err))
    } else {
        elkUser.addUserDetails(data).then(value => res.send('Success')).catch(err => res.send(err))
    }
});
router.post('/update', function(req, res) {
    var data = req.body.data;
    console.log('signup ',dataStore)
    if (dataStore == 'sqlite') {
        sqlUser.updateUserDetails(data).then(value => {
            res.send('Success')
        }).catch(err => res.send(err))
    } else {
        elkUser.updateUserDetails(data).then(value => res.send('Success')).catch(err => res.send(err))
    }
});
router.post('/delete', function(req, res) {
    var id = req.body.id;
    console.log('signup ',id)
    if (dataStore == 'sqlite') {
        sqlUser.deleteUserDetails(id).then(value => {
        	console.log('$$$$$$$$$$$$$$$$$$$$$$$$$')
            res.send('Success')
        }).catch(err => res.send(err))
    } else {
        elkUser.deleteUserDetails(id).then(value => res.send('Success')).catch(err => res.send(err))
    }
});
router.post('/migrate', function(req, res) {
    console.log('migrate ',dataStore)

    dataStore = 'elk';
    console.log('migrate ',dataStore)

    elkUser.migrateUserDetails().then(function(response) {
        res.send(response);
    }).catch(function(err) {
        res.send(err)
    });
});

app.use(bodyParser.json())

app.use("/", router);

app.listen(4000)