const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const db = require("./data.js")();
const pubdir = __dirname + "/public";
const path = require("path");
const bcrypt = require("bcryptjs");

server.listen(80);

app.use(session({
    secret: "lBroKrhQ23S@qItB{0zF5XfpAT3>",
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res, next) {
    //Login/signup filter
    if (!req.session.user) {
        res.sendFile(path.join(pubdir, "/signup.html"));
    } else next();
});

app.post("/login", function(req, res, next) {
    db.validateUser({
            login: req.body.username,
            password: req.body.password
        }).then(function() {
            req.session.user = req.body.username;
            res.redirect("/");
    })
});

app.post("/signup", function(req, res, next) {
    if (req.body.password === req.body["password-confirm"]) {
        db.addUser({
            login: req.body.username,
            password: req.body.password
        })
    }

    res.redirect("/");
});

app.use(express.static(pubdir));

io.on("connection", (socket) => {
    console.log("Hi " + socket.id);

    db.getRegions().then((resultSet) => {
        socket.emit("receive-regions", resultSet);
    });
    //console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("Bye " + socket.id);
    })
});
