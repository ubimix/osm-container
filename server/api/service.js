var _ = require('underscore');
var FS = require('fs');
var Path = require('path');
var OsmService = require('./OsmService');

module.exports = function() {
    var host = readFile('../.db-config/db.host', 'localhost');
    var user = readFile('../.db-config/db.user', 'postgres');
    var port = readFile('../.db-config/db.port', '5432');
    var password = readFile('../.db-config/db.pass', 'postgres');
    var dbname = readFile('../.db-config/db.name', 'postgres');
    var config = {
        host : host,
        port : port,
        user : user,
        password : password,
        dbname : dbname
    };
    return new OsmService(config);
};

function readFile(name, defaultValue) {
    var file = Path.resolve(__dirname, name);
    var content = defaultValue;
    try {
        content = FS.readFileSync(file, 'UTF-8') || defaultValue;
    } catch (err) {
    }
    content = content || defaultValue;
    content = content.replace(/^[\s\r\n]*|[\s\r\n]$/gim, '');
    return content;
}