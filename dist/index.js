'use strict';

var _require = require('conventional-changelog/lib/git');

var parseRawCommit = _require.parseRawCommit;

var typeMap = {
  chore: 'patch',
  docs: 'patch',
  feat: 'minor',
  fix: 'patch',
  perf: 'patch',
  refactor: 'patch',
  test: 'patch'
};

module.exports = function (pluginConfig, _ref, cb) {
  var commits = _ref.commits;

  var type = null;

  commits.map(function (commit) {
    return parseRawCommit(commit.hash + '\n' + commit.message);
  }).every(function (commit) {
    if (!commit) {
      type = 'patch';
      return true;
    }

    if (commit.breaks.length) {
      type = 'major';
      return false;
    }

    if (commit.type in typeMap) {
      type = typeMap[commit.type];
    }

    return true;
  });

  cb(null, type);
};