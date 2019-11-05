const fs = require('fs');

function getUserByEmail(email, callback) {
    getUsers(function (err,users) {
        if (err) {
            callback(err);
        } else if (users && users.length) {
            callback(null, users.find(user=>user.email === email));
        } else {
            callback(null, null);
        }
    });
}
function getEmail() {
    return process.argv[3];
}
function getUsers(callback) {
    fs.readFile('./users.json', function(err,result) {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(result.toString()));
        }
    });
}
function setUser(user, callback) {
    getUsers(function (err, users) {
        if (err) {
            callback(err);
        } else {
            if (!user) {
                users = [];
            }
            users.push(user);
            fs.writeFile('./users.json', JSON.stringify(users), callback);
        }
    });
}
function getDetails() {
    return {
        email: getEmail(),
        password: process.argv[4],
        birthDate: process.argv[5],
        adress: process.argv[6],
        city: process.argv[7]
    };
}
function filterUsersByEmail (email, callback) {
    getUsers(function (err, users) {
        if (err) {
            callback(err);
        } else if (users && users.length) {
            const newUsers = users.filter(user =>user.email !== email);
            callback(null, newUsers);
        } else {
            callback(null, []);
    }
    });
}
module.exports = {
    getUserByEmail,
    getEmail,
    setUser,
    getDetails,
    filterUsersByEmail
};
