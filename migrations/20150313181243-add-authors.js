var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

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

	async.forEach(authors, function (author, next) {
		db.insert("authors", ["name"], [author], next);
	}, callback);

};

exports.down = function(db, callback) {
	callback();
};
