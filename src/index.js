const { parseRawCommit } = require('conventional-changelog/lib/git')
const typeMap = {
  chore: 'patch',
  docs: 'patch',
  feat: 'minor',
  fix: 'patch',
  perf: 'patch',
  refactor: 'patch',
  test: 'patch'
}

module.exports = function (pluginConfig, {commits}, cb) {
  let type = null

  commits

  .map((commit) => parseRawCommit(`${commit.hash}\n${commit.message}`))

  .filter((commit) => !!commit)

  .every((commit) => {
    if (commit.breaks.length) {
      type = 'major'
      return false
    }

    if (commit.type in typeMap) {
      type = typeMap[commit.type]
    }

    return true
  })

  cb(null, type)
}
