const {getUserByEmail, setUser} = require('../users');
const {deleteAct, updateAct} = require('../actions');

module.exports = function(app) {
    app
        .get('/api/users/:email', (req, res) => {
            getUserByEmail(req.params.email,(err, user) => {
                    if (err) {
                        res.status(500).end()
                    } else if (!user) {
                        res.status(404).json({message: 'user not found'}).end();
                    } else {
                        res.json(user).end();
                    }
                }
            );
        })
        .post('/api/users', (req, res) => {
            setUser(req.body, (err) => {
                if (err) {
                    res.status(500).end();
                } else {
                    res.json(req.body).end();
                }
            });
        })
        //TODO: put and delete!
        .put('/api/users/:email', (req, res) => {
            updateAct(req.params.email, req.body, (err) => {
               if (err) {
                   res.status(500).end();
               } else {
                   res.json(req.body).end();
               }
            });
        })
        .delete('/api/users/:email', (req, res) => {
            deleteAct(req.params.email, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end();
                } else {
                    res.json({message: `user ${req.params.email} was deleted`}).end();
                }
            });
        });
};
