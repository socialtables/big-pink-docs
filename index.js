var koa = require('koa');
var Github = require('github-api');
var app = koa();
var fs = require('fs');

var github = new Github({
  token: process.env.GITHUB_KEY,
  auth: "oauth"
});


var repo = github.getRepo("socialtables", "S3");

app.use(function *(){

  repo.getTree('master?recursive=true', function(err, tree) {
    
    if(err) {
      console.error('server error', err);
    }
    var i;
    for(i = 0; i < tree.length; i++) {

      var path = tree[i].path;
      var sha = tree[i].sha;
      var url = tree[i].url;
      var index = path.indexOf('README');
      if(index >= 0) {
        repo.getCommits({path:path}, function(err,commits) {
          if(err) {
            console.error('server error', err);
          }
          console.log(commits[0].commit.committer);
          console.log(commits[0].commit.message);
        })
        repo.getBlob(sha, function(err, blob) {
          if(err) {
            console.error('server error', err);
          }
          console.log(blob);
        })

      }
    }

  });
  this.body = 'Big Pink';
});

app.listen(2434);