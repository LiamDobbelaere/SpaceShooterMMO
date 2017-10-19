const express = require("express");
const app = express();
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(80);

app.use(session({
    secret: "lBroKrhQ23S@qItB{0zF5XfpAT3>",
    resave: false,
    saveUninitialized: true
}));

app.get("*", function (req, res, next) {
    console.log(req.session.user);
    if (!req.session.user) {
        req.session.user = "digaly";
        res.send("Aw heck, you're not logged in!");
    } else {
        next();
    }
});

app.use(express.static(__dirname + "/public"));
