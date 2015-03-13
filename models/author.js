var bookshelf = require("./index");
var Author = bookshelf.Model.extend({
	tableName: "authors",
	findById: function(id) {
		var author = this.where("id", id).fetch();
		return author;
	},
	findByName: function(name) {
		var author = this.where("name", name).fetch();
		return author;
	}
});

module.exports = bookshelf.model("Author", Author);