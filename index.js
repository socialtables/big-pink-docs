var koa = require('koa');
var Github = require('github-api');
var app = koa();
var fs = require('fs');
var router = require("koa-router");
app.bookshelf = require("./models/index");
var Author = require("./models/author");
var Readme = require("./models/readme");

app.use(router(app));

var github = new Github({
	token: process.env.GITHUB_KEY,
	auth: "oauth"
});

var repo = github.getRepo("socialtables", "S3");

app.get("/get-data", function *(){

	repo.getTree('master?recursive=true', function(err, tree) {

		if(err) {
			console.error('server error', err);
		}

		tree.forEach(function(file){
			var path = file.path;
			var sha = file.sha;
			var url = file.url;
			var index = path.indexOf('README');
			if(index >= 0) {
				var newReadme =  new Readme({sha:sha,url:path}).save().then(function(readme){
					updateDatabase(path,sha,readme.get("id"));
				});
			}
		});

	});
	this.body = 'Big Pink';
});

function updateDatabase(path, sha, id){
	repo.getCommits({path:path}, function(err,commits) {
		if(err) {
			console.error('server error', err);
		}

		var committer = commits[0].author.login;
		var commitMessage = commits[0].commit.message;
		var createdAt = commits[0].commit.author.date;
		var updatedAt = commits[0].commit.committer.date;
		var commitHash = commits[0].sha;

		var newAuthor = new Author({name: committer}).fetch().then(function(author){
			var authorId = author.attributes.id;
			var updateReadme = new Readme({id: id})
				.save({commit_message:commitMessage, created_at:createdAt, updated_at: updatedAt, commit_hash: commitHash, author_id: authorId}, {patch: true});	
		});
	});

	repo.getBlob(sha, function(err, blob) {
		if(err) {
			console.error('server error', err);
		}

		var readmeBody = blob;
		var updateReadme = new Readme({id: id})
		.save({body:readmeBody}, {patch: true});
	});
};


app.listen(2434);