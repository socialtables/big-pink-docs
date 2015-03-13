var path = require("path");

var knex = require("knex")({
	client: 'mysql',
	 connection: {
	    host     : '127.0.0.1',
	    user     : 'root',
	    password : '',
	    database : 'bigpinkdatabase'
	  }
});
var bookshelf = require("bookshelf")(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;

var fs = require("fs");
fs.readdirSync(__dirname).forEach(function(file) {
	if (path.extname(file) == ".js") {
		require("./" + file);
	}
});
