require('./db/mongodb');
const express = require('express');
var app = express();
var server = require('http').Server(app);
const login = require("./api/login");
const users = require("./api/user");
const organization = require("./api/organization");
const lessons = require("./api/lessons");
const autocomplete = require("./api/autocomplete");


var bodyparser = require("body-parser");
var cors = require("cors");

const port = process.env.port || 6001;

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(__dirname + 'uploads'));
app.use('/api/uploads', express.static(__dirname + '/api/uploads'));
app.use('/api/uploads', express.static(__dirname + '/uploads'));

app.use("/api/login", login);
app.use("/api/user", users);
app.use("/api/organization", organization);
app.use("/api/lessons", lessons);
app.use("/api/autocomplete", autocomplete);



//if we are here then the specified request is not found
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

server.listen(port);