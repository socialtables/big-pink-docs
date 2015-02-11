var koa = require('koa');
var Github = require('github-api');
var app = koa();

var github = new Github({
  token: "e4f4ea68ce920025f475ed6eece476888e646181",
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
      var index = path.indexOf('README');
      if(index >= 0) {
        console.log(path);
      }
    }

  });

  this.body = 'Big Pink';
});

app.listen(2434);
