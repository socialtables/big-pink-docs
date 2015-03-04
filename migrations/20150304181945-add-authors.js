var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {

	db.createTable('authors', {
    id: { type: 'int', primaryKey: true,  autoIncrement: true  },
    name: 'string'
 }, callback);

};

exports.down = function(db, callback) {
	db.dropTable("authors", callback);
};
