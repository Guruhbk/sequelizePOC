const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
global.dataStore = 'sqlite'
const {
    userDetails
} = require('./helper/userHelper');
var data = {
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    password: 'janedoe123',
    org: 'skedler',
    role: 'engineer'
}

router.get('/getAllUsers', function(req, res) {
    userDetails.getUserDetails(dataStore).then(value => {
        res.send(value)
    })

})
router.post('/signup', function(req, res) {
    var data = req.body.data;
    userDetails.addUserDetails(dataStore, data).then(value => {
        res.send(value)
    })

});
router.post('/update', function(req, res) {
    var data = req.body.data;
    var id = req.body.id
    console.log('signup ', dataStore)
    userDetails.updateUserDetails(dataStore, data, id).then(value => {
        res.send(value)
    }).catch(err => {
        console.log('res.send(value) 0', err)
        res.send(err);
    })
});
router.post('/delete', function(req, res) {
    var id = req.body.id;
    console.log('signup ', id)
    userDetails.deleteUserDetails(dataStore, id).then(value => {
        res.send(value)
    }).catch(err => {
        reject(err);
    })
});

app.use(bodyParser.json())

app.use("/", router);

app.listen(4000)