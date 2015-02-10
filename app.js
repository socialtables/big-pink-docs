var fs = require("fs");
var koa = require("koa");
var request = require("request");
var github = require("github");
var bodyParser = require("koa-body");

var router = require("koa-router");

// Ensure that if env is not set, we're in development mode
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = koa();

/* body parsing */
app.use(bodyParser({
	multipart: true
}));

/* Sets up routes */
app.use(router(app));

module.exports = app;

/* Load the actual server -- unless we're in testing mode */
if (!module.parent) {
	var PORT = process.env.PORT || 5001;
	app.listen(PORT, function(err) {
		if(err){
			throw err;
		}
		else {
			console.log("CONNECTED ON PORT", PORT);
		}
	});
}


app.get("/", function*() {
	this.body = {message: "our future project!"};
	console.log("something happened")
});