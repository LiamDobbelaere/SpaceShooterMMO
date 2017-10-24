function parseConnectionString(connectionString) {
    let dbConnectionInfo = {};
    //let connStrTest = "Database=localdb;Data Source=127.0.0.1:56934;User Id=azure;Password=6#vWHD_$";
    connectionString.split(";").forEach(function (item) {
        let keyValue = item.split("=");
        let key = keyValue[0].split(" ").join("").toLowerCase();

        if (key === "datasource") {
            let ipAndPort = keyValue[1].split(":");

            dbConnectionInfo["ip"] = ipAndPort[0];
            dbConnectionInfo["port"] = ipAndPort[1];
        } else {
            dbConnectionInfo[key] = keyValue[1];
        }
    });

    return dbConnectionInfo;
}

module.exports = parseConnectionString;