const bcrypt = require('bcryptjs');
const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 20,
    host: "servers.dobbelaere.solutions",
    port: "3306",
    database: "spacemmo",
    user: "spacemmo",
    password: "sp4c3mm0"
});

const queries = {
    "ADD_USER": "INSERT INTO responder (login, password) VALUES (?, ?)",
    "GET_USER": "SELECT login, password FROM responder WHERE login = ?",
    "GET_REGIONS": "SELECT * FROM region"
};

function query(query, args) {
    return new Promise((resolve, reject) => {
        pool.query(query, args, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        });
    });
}

function addUser(user) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 8, function(err, hash) {
            if (err === null) {
                query(queries.ADD_USER, [user.login, hash])
                    .then(resultSet => {
                        resolve(true);
                    }).catch(error => reject(error))
            } else {
                reject(err);
            }
        });
    });
}

function validateUser(user) {
    return new Promise((resolve, reject) => {
        query(queries.GET_USER, [user.login])
            .then(resultSet => {
                if (resultSet.length === 0) reject("User does not exist");
                else bcrypt.compare(user.password, resultSet[0].password).then(res => {
                    if (res) resolve(true);
                    else reject("Wrong password");
                });
            })
            .catch(error => reject(error));
    });
}

function getRegions() {
    return new Promise((resolve, reject) => {
        query(queries.GET_REGIONS, [])
            .then(resultSet => {
                resolve(resultSet);
            })
            .catch(error => reject(error));
    });
}

function init() {
    return {
        addUser: addUser,
        validateUser: validateUser,
        getRegions: getRegions
    }
}

module.exports = init;