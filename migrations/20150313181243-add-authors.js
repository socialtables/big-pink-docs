var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	var authors = [
		"bpyser",
		"conorhastings",
		"danberger",
		"danmactough",
		"ecgeiser",
		"jjow",
		"johnelliott",
		"mcwhittemore",
		"necaris",
		"onesien",
		"pbmasigla",
		"rickyvetter",
		"rovolution",
		"tiansijie",
		"wontwon",
		"yalcindo"
	];

	authors.forEach(function(author){
		db.insert("authors", ["name"], [author], callback);
	});
};

exports.down = function(db, callback) {

};
