// fsUtils.js

const fs = require('fs')

var lstat = Promise.promisify(fs.lstat)

var rename = Promise.promisify(fs.rename)

exports.createDirectories = function () {
  for (let i in config.reDir) {
    lstat('./' + config.reDir[i])
      .then(stats => {
        // need to do something if its a file instead of directory
        if (stats.isDirectory()) {
        }
      })
      .catch(() => {
        fs.mkdirSync('./' + config.reDir[i])
      })
  }
}

exports.renameLogFiles = function () {
  for (let i in logFile) {
    lstat(config.logFileLocation + i + '.log')
      .then(stats => {
        if (stats !== undefined && stats.isFile()) {
          let fileDate = dateFormat(new Date(), 'yyyymmdd_hhMMss')
          rename(config.logFileLocation + i + '.log', config.logFileLocation + fileDate + '_' + i + '.log')
            .then(() => {})
            .catch(() => {})
        }
      }).catch(() => {

      })
  }
}
