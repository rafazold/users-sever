// option 2  -written with david:
const http = require('http');
const {getUserByEmail, setUser} = require('./users');
const {deleteAct, updateAct} = require('./actions');
const {setPunch} = require('./punch');


const server = http
    .createServer(function (req, res) {
        const url = new URL('http://localhost' + req.url);
        const emailUser = url.searchParams.get('email');
        const punchType = url.searchParams.get('punch');
        switch (url.pathname) {
            case '/api/users':
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk;
                    });
                    req.on('end', () => {
                        setUser(JSON.parse(body), function (err) {
                            if (err) {
                                res.statusCode = 500;
                                res.end();
                            } else {
                                res.statusCode = 200;
                                res.end(body);
                            }
                        });
                    });
                } else if (req.method === 'GET') {
                    getUserByEmail(emailUser,function (err, user) {
                            if (err) {
                                res.statusCode = 500;
                                res.end();
                            } else if (!user) {
                                res.statusCode = 404;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({message: 'user not found'}));
                            } else {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify(user));
                            }
                        }
                    );
                } else if (req.method === 'DELETE') {
                    deleteAct(emailUser, (err)=> {
                        if (err) {
                            res.statusCode = 500;
                            res.end();
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({message: `User - ${emailUser} is deleted`}));
                        }
                    });
                } else if (req.method === 'PUT') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk;
                    });
                    req.on('end', () => {
                        updateAct(emailUser, JSON.parse(body),function (err) {
                            if (err) {
                                res.statusCode = 500;
                                res.end();
                            } else {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({message: `The user - ${emailUser} has been edited!`}));
                            }
                        });
                    });
                }
                break;
            case '/api/punches':
                if (req.method === 'POST') {
                    setPunch (emailUser, punchType, function (err, punch) {
                        if (err) {
                            res.statusCode = 500;
                            res.end();
                        } else if (punchType==='checkin' || punchType==='checkout') {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.write(JSON.stringify({message: `New ${punchType} for ${emailUser}!`}));
                            res.end(JSON.stringify(punch));
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({message: `ERROR : Punch type doesn't exist`}));
                        }
                    });
                }
        }
    });

server.listen(3000, function () {
    console.log('this is the new server!! yay!');
});

// Class Work:
// const http = require('http');
// let counter = 0;
// function serverCallback(req, res) {
//     const value = Number(req.url.substr(1));
//     console.log('We have a request', value);
//     counter += value;
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify({
//         yourValue: value,
//         newCounter: counter
//     }));
// }
// const server = http.createServer(serverCallback);
//
// server.listen(3000, function () {
//     console.log('Server is listening...');
// });





// My solution of HW
// const http = require('http');
// const {getUserByEmail} = require('./users');
//
// function serverCallback(req, res) {
//     const input = req.url.substr(1);
//     console.log('We have a request', input);
//     let callBack = function (err, user) {
//         if (err) {
//             res.end(err.message);
//         } else {
//             res.end(JSON.stringify(user));
//         }
//     };
//     const userDetails = getUserByEmail(input, callBack);
//     res.setHeader('Content-Type', 'application/json');
// }
// const server = http.createServer(serverCallback);
//
// server.listen(3000, function () {
//     console.log('Server is listening...');
// });