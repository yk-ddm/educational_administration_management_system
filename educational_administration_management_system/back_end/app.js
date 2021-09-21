const express = require('express')
const router = require('./router.js')
const path = require('path')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

var server = app.listen(3000, () => {
    var host = server.address().address,
        port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
})