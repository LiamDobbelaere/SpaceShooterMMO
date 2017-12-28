const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const session = require("express-session");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const connectionInfo = require("./connectionstring")(process.env.MYSQLCONNSTR_localdb || "Database=spacemmo;Data Source=localhost:3306;User Id=root;Password=root");
const db = require("./data.js")(connectionInfo);
const pubdir = __dirname + "/public";
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore({
    host: connectionInfo.ip,
    port: connectionInfo.port,
    database: connectionInfo.database,
    user: connectionInfo.userid,
    password: connectionInfo.password,
    checkExpirationInterval: 900000,
    expiration: 30 * 24 * 60 * 60 * 1000,
    createDatabaseTable: true,
    connectionLimit: 20,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});
const sharedsession = require("express-socket.io-session");

console.log(connectionInfo);
server.listen(process.env.PORT || 80);

let sessionDetails = session({
    key: "spacemmo",
    secret: "lBroKrhQ23S@qItB{0zF5XfpAT3>",
    store: sessionStore,
    resave: true,
    saveUninitialized: true
});

app.use(sessionDetails);
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

app.get("/logout", function (req, res, next) {
    delete req.session["user"];

    res.redirect("/");
});

app.post("/login", function (req, res, next) {
    db.validateUser({
        login: req.body.username,
        password: req.body.password
    }).then(function (user) {
        let cleanUser = JSON.parse(JSON.stringify(user));
        delete cleanUser["password"];

        req.session.user = cleanUser;
        res.redirect("/");
    })
});

app.post("/signup", function (req, res, next) {
    if (req.body.password === req.body["password-confirm"]) {
        db.addUser({
            login: req.body.username,
            password: req.body.password,
            faction: req.body.faction
        })
    }

    res.redirect("/");
});

app.get("/api/regions", function(req, res, next) {
    db.getRegions().then((resultSet) => {
        res.send(resultSet);
    });
});

app.use(express.static(pubdir));

io.use(sharedsession(sessionDetails, {
    autoSave: true
}));

io.on("connect", (socket) => {
    console.log("Hi " + socket.id);

    db.getRegions().then((resultSetRegions) => {
        db.getWorldPercent().then((resultSetWorldPercent) => {
            console.log(resultSetWorldPercent);

            socket.emit("receive-userinfo", {
                regions: resultSetRegions,
                user: socket.handshake.session.user,
                worldpercent: resultSetWorldPercent
            });

        });
    });
    //console.log(socket.id);

    socket.on("update-region-faction", (region) => {
        region.faction = socket.handshake.session.user.faction;

        db.updateRegionFaction(region.x, region.y, socket.handshake.session.user.faction).then((resultSet) => {
            db.getWorldPercent().then((worldpercent) => {
                io.emit("update-region", {
                    region: region,
                    worldpercent: worldpercent
                });
            });
        });
    });

    socket.on("disconnect", () => {
        console.log("Bye " + socket.id);
    })
});
