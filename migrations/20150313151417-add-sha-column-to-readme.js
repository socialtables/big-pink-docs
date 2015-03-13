var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {

	db.addColumn('readmes', 'sha', {type:'string'}, callback)

};

exports.down = function(db, callback) {
	db.removeColumn("readmes", "sha",   callback);
};
