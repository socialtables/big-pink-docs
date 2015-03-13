var bookshelf = require("./index");
var Readme = bookshelf.Model.extend({
	tableName: "readmes",
	findById: function(id) {
		var readme = this.where("id", id).fetch();
		return readme;
	},
	findByRelativePath: function(path) {
		var readmes = this.query('where', 'url', 'like', '%' + path + '%').fetchAll();
		return readmes;
	},

	findByPath: function(path) {
		var readme = this.where("url", path).fetch();
		return readme;
	},
	
	findBySha: function(sha) {
		var readme = this.where("sha", sha).fetch();
		return readme;
	}
});

module.exports = bookshelf.model("Readme", Readme);