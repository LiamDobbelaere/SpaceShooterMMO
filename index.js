const express = require("express");
const app = express();
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const db = require("./data.js")();

server.listen(80);

app.use(session({
    secret: "lBroKrhQ23S@qItB{0zF5XfpAT3>",
    resave: false,
    saveUninitialized: true
}));

app.get("*", function (req, res, next) {
    //console.log(req.session.user);
    /*if (!req.session.user) {
        req.session.user = "digaly";
        res.send("Aw heck, you're not logged in!");
    } else {*/
    next();
    //}
});

app.use(express.static(__dirname + "/public"));

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
