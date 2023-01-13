var express = require('express')
var server = express()

server.use(express.static("../4419"));

server.listen(8080)