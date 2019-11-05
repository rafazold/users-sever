const {readFile, writeFile} = require('fs');
const {getEmail} = require('./users');

function getPunches(callback) {
    readFile('./punches.json', function (err,result){
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(result.toString()));
        }
    });
}
function setPunch(mail, punch, callback) {
    getPunches(function (err, punches) {
        if (err) {
            callback(console.log(`ERROR: Type of punch "${mail}" not found.`, err));
        } else {
            if (!punches) {
                punches = [];
            }
            const punchType = punch;
            if (punchType === "checkin" || punchType === "checkout") {
                let newPunch = {
                    email: mail,
                    type: punchType,
                    created: new Date()
                };
                punches.push(newPunch);
                writeFile('./punches.json', JSON.stringify(punches), function (err) {
                    if (err) {
                        callback(console.log(`ERROR: Type of punch "${mail}" not found.`));
                    } else {
                        callback(null, newPunch);
                        console.log('Punch successfully saved!');
                    }
                });
            } else {
                callback(console.log('ERROR: punch type is not valid'));
            }
        }
    });
}
function getPunchType () {
        return process.argv[4] || "checkin";
}
module.exports = {
    setPunch,
    getPunchType
};
