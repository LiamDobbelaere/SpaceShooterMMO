const bcrypt = require('bcryptjs');
const mysql = require("mysql");
let pool;

const queries = {
    "ADD_USER": "INSERT INTO user (login, password, faction) VALUES (?, ?, ?)",
    "GET_USER": "SELECT login, password, faction, money FROM user WHERE login = ?",
    "GET_REGIONS": "SELECT * FROM region",
    "UPDATE_REGION_FACTION": "UPDATE region SET faction = ? WHERE x = ? AND y = ?",
    "REGION_EXISTS": "SELECT * FROM region WHERE x = ? AND y = ?",
    "INSERT_REGION_FACTION": "INSERT INTO region (faction, x, y) VALUES (?, ?, ?)",
    "GET_WORLDPERCENT": "SELECT BOLT, TRRA, `H3-RB` FROM worldpercent"
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
                query(queries.ADD_USER, [user.login, hash, user.faction])
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
                    if (res) resolve(resultSet[0]);
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

function getWorldPercent() {
    return new Promise((resolve, reject) => {
        query(queries.GET_WORLDPERCENT, [])
            .then(resultSet => {
                console.log(resultSet);

                let worldpercent = {
                    BOLT: resultSet[0].BOLT,
                    TRRA: resultSet[0].TRRA,
                    "H3-RB": resultSet[0]["H3-RB"],
                    FREE: 100 - resultSet[0].BOLT - resultSet[0].TRRA - resultSet[0]["H3-RB"]
                };

                resolve(worldpercent);
            })
            .catch(error => reject(error));
    });
}

function updateRegionFaction(x, y, faction) {
    return new Promise((resolve, reject) => {
        query(queries.REGION_EXISTS, [x, y])
            .then(resultSet => {
                if (resultSet.length !== 0) {
                    query(queries.UPDATE_REGION_FACTION, [faction, x, y])
                        .then(resultSet => {
                            resolve(resultSet);
                        })
                        .catch(error => reject(error));
                } else {
                    query(queries.INSERT_REGION_FACTION, [faction, x, y])
                        .then(resultSet => {
                            resolve(resultSet);
                        })
                        .catch(error => reject(error));
                }
            });
    });
}

function init(connectionInfo) {
    pool = mysql.createPool({
        connectionLimit: 20,
        host: connectionInfo.ip,
        port: connectionInfo.port,
        database: connectionInfo.database,
        user: connectionInfo.userid,
        password: connectionInfo.password
    });

    return {
        addUser: addUser,
        validateUser: validateUser,
        getRegions: getRegions,
        updateRegionFaction: updateRegionFaction,
        getWorldPercent: getWorldPercent
    }
}

module.exports = init;