const fs = require('fs');
const {getUserByEmail, getEmail,setUser,getDetails,filterUsersByEmail} = require('./users');
function getAction() {
    return process.argv[2];
}
function getAct (callback) {
    const email =getEmail();
    getUserByEmail(email, function (err, user) {
        if (err) {
            callback(err);
        } else if (!user) {
            callback ({message: `ERROR: User with mail "${email}" not found`})
        } else {
            callback(null, user);
        }
    });
}
function createAct () {
    const details = getDetails();
    setUser(details, function (err) {
        if (err) {
            console.log('Failed to save user', err);
        } else {
            console.log('Successfully saved: ', details);
        }
    });
}
function deleteAct (email, callback) {
    filterUsersByEmail(email, function (err, newUsers) {
        if (err) {
            callback(err);
        } else {
            fs.writeFile('./users.json', JSON.stringify(newUsers), callback);
        }
    });
}
function updateAct (email, newDetails, callback) {
    filterUsersByEmail(email, function (err, newUsers) {
        if (err) {
            callback(err);
        } else {
            newUsers.push(newDetails);
            fs.writeFile('./users.json', JSON.stringify(newUsers), callback);
        }
    });
}
module.exports = {
    getAct,
    createAct,
    deleteAct,
    updateAct,
    getAction
};