function Command() {
  this.prefix = ''
  this.query = ''

  this.SetPrefix = function (prefix) {
    this.prefix = prefix
  }

  this.SetQuery = function (query) {
    query = query || ''
    if (this.prefix == query.charAt(0)) {
      //1. Convert multiple spaces/tabs/newlines into 1 space between words
      //2. Clean command prefix from query
      this.query = query.replace(/\s\s+/g, ' ').substr(1)
    } else {
      this.query = ''
    }
  }

  this.GetCommandName = function () {
    return this.query.split(' ')[0] //.toLowerCase()
  }

  this.GetArgs = function (index, length) {
    index = typeof index === 'number' ? index : false
    if (index === false) {
      var arr = this.query.split(' ')
      arr.shift()
      return arr
    } else {
      length = typeof length === 'number' ? length : false
      var arr = this.query.split(' ')
      if (length === false) {
        arr.shift()
        arr = arr.splice(index)
        return arr.join(' ')
      } else {
        arr.shift()
        arr = arr.splice(index, length)
        return arr.join(' ')
      }
    }
  }
}

module.exports = Command