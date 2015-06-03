#!/usr/bin/env node

var github = require('octonode');
var client = github.client(process.argv[2]);
var ghme = client.me();
var ghsearch = client.search();
var repository = require('./repository.json');

if(process.argv.length < 3) {
  return console.log('Please pass access token in argument');
}

repository.forEach(function(repo) {
  ghsearch.repos({
    q: 'repo:' + repo,
    sort: 'created',
    order: 'asc'
  }, function(err, data) {
    if(err) throw Error('Unable to get repository list', err);
    if(data){
      ghme.star(data.items[0].full_name);
    }
  })
});
