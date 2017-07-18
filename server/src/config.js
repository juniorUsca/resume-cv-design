var fs = require('fs')

module.exports = function (){
    this.CONFIG_SRC = '_config.json'
    return JSON.parse(fs.readFileSync(this.CONFIG_SRC, 'utf8'));
}