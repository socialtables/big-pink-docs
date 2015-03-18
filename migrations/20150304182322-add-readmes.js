var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {

  db.createTable('readmes', {
    id: { type: 'int', primaryKey: true,  autoIncrement: true  },
    body: 'text',
    created_at:"timestamp",
    updated_at:"timestamp",
    commit_message:"text",
    commit_hash:"string",
    url:"string",
    author_id:"int"
  }, callback);

};

exports.down = function(db, callback) {
	db.dropTable("readmes", callback);
};
