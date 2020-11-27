const fs = require('fs')
const path = require('path')

module.exports = function (repo) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(repo, '.git/HEAD'), 'utf-8', function (err, head) {
      if (err) return reject(err)
      if (/^[a-f0-9]+$/.test(head.trim())) return resolve(head.trim())
      const ref = head.trim().split('ref: ')[1]
      if (!ref) return reject(new Error('Could not parse head: ' + head.trim()))
      fs.readFile(path.join(repo, '.git', ref), 'utf-8', function (err, hash) {
        if (err) return resolve(null)
        resolve(hash.trim())
      })
    })
  })
}
