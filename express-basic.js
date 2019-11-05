const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.json({message: 'hello world'});
});

app.listen(3000, () => {
    console.log('server is up')
});