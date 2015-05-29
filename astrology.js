#!/usr/bin/env node

var github = require('octonode');
var client = github.client(process.argv[2]);
var ghme = client.me();
var ghsearch = client.search();
var repository = require('./repository.json');

if(process.argv.length < 3) {
  console.log("Please pass access token in argument");
} else {
  for(var i = 0; i < repository.length; i++) {
    ghsearch.repos({
	    q: 'repo:' + repository[i],
	    sort: 'created',
	    order: 'asc'
    }, function(err, data) {
      if(data){
        ghme.star(data.items[0].full_name);
      }
    });
  }
}
