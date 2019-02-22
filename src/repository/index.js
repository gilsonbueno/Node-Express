var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS PERSON (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, AGE INTEGER)');
    db.run('INSERT INTO PERSON (NAME, AGE) VALUES (?, ?)', "First Person", 21);
});

module.exports = {
    findAll: (handler, res) => {
        db.all("SELECT * FROM PERSON", function (err, row) {
            handler(err, row, res);
        });
    },
    findById: (id, handler, res) => {
        db.get('SELECT * FROM PERSON WHERE ID = ?', id, function (err, row) {
            handler(err, row, res);
        });
    },
    register: (data, handler, res) => {
        db.run('INSERT INTO PERSON (NAME, AGE) VALUES (?, ?)', data.NAME, data.AGE, function (err, row) {
            //handler(err, this.lastID, res);
            handler(err, res);
        });
    },
    update: (data, handler, res) => {
        db.run('UPDATE PERSON SET NAME = ?, AGE = ? WHERE ID = ?', data.NAME, data.AGE, data.ID, function (err, row) {
            handler(err, res);
        });
    },
    delete: (id, handler, res) => {
        db.run('DELETE FROM PERSON WHERE ID = ?', id, function (err, row) {
            handler(err, res);
        });
    }
};