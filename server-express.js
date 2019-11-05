const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const punchesRoutes = require('./routes/punches');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   console.log(`CALL: ${req.method} - ${req.url}`);
   next();
});

userRoutes(app);
punchesRoutes(app);

app.listen(3000, () => {
    console.log('server is up')
});