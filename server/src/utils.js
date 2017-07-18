var fs = require('fs'),
    ncp = require('ncp').ncp;

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

var deleteFolderContentRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    })
  }
}

var copy = function(to, from) {
  ncp(from, to, function (err) {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = {
  "deleteFolderRecursive": deleteFolderRecursive,
  "deleteFolderContentRecursive": deleteFolderContentRecursive,
  "copy": copy
}