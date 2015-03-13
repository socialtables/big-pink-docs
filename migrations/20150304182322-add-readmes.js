var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {

	db.createTable('readmes', {
    id: { type: 'int', primaryKey: true,  autoIncrement: true  },
    body: 'text',
    created_at:"date",
    updated_at:"date",
    commit_message:"text",
    commit_hash:"string",
    url:"string",
    author_id:"int"
 }, callback);

};

exports.down = function(db, callback) {
	db.dropTable("authors", callback);
};
