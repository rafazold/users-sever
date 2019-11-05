const {getAction, getAct, createAct,deleteAct,updateAct} = require('./actions');
const {setPunch, getPunchType} = require('./punch');
const {getDetails} = require('./users')
// do the action:
const action = getAction();
switch (action) {
    case "get":
        getAct(function (err, user) {
            if (err) {
                console.log(err.message);
            } else {
                console.log(user.toString());
            }
        });
        break;
    case "create":
        createAct(function (err) {
            if (!err) {
                console.log('created finished!');
            }
        });
        break;
    case "punch":
        setPunch(process.argv[3], getPunchType, function (err) {
            if (!err) {
                console.log('punch finished!');
            }
        });
        break;
    case "delete":
        deleteAct(process.argv[3], function deleteCallback(err){
            if(!err) {
                console.log('delete finished');
            }
        });
        break;
    case "update":
        updateAct(process.argv[3], getDetails() ,  function updateCallback (err) {
            if (!err) {
                console.log('update finished!');
            }
        });
        break;
}