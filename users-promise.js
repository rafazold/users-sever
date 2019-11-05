const fs = require('fs');


function getUsers() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./users.json', function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(result.toString()));
            }
        });
    });
}

function getUserByEmail(email) {
    return getUsers().then(users => {
        if (users && users.length) {
            return users.find(user => user.email === email);
        }
    });
}