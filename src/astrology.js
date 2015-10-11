#!/usr/bin/env node

const github = require('octonode');
const client = github.client(process.argv[2]);
const ghme = client.me();
const ghsearch = client.search();
const repository = require('./repository.json');

if(process.argv.length < 3) {
  console.log('Please pass access token in argument');
  process.exit(1);
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
