const {setPunch} = require('../punch');

function checkPunchType(req, res, next) {
    const punchType = req.params.punchType;
    if (punchType==='checkin' || punchType==='checkout') {
        req.punchType = punchType;
        next();
    } else {
        res.json({message: `ERROR : Punch type doesn't exist`}).end();
    }
}

function set(req, res) {
    setPunch (req.params.email, req.punchType, function (err, punch) {
        if (err) {
            res.status(500).end();
        } else {
            res.json(punch).end();
        }
    });
}

module.exports = function(app) {
    app
        .post('/api/punches/:email/:punchType', checkPunchType, set);
};