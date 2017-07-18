var fs = require('fs'),
    Handlebars = require('handlebars')

/// All layouts are partials
module.exports = function (){
    this.PARTIALS_DIR = 'theme/_partials'
    this.LAYOUTS_DIR = 'theme/_layouts'
    this.partialslist = []
    this.layoutslist = []
    
    this.chargePartials = function() {
        var self = this
        var files = fs.readdirSync(this.PARTIALS_DIR)
        files.forEach(function(file_name) {
            var partial_name = file_name.substr(0,file_name.indexOf('.'))
            var source = fs.readFileSync(`${self.PARTIALS_DIR}/${file_name}`, {encoding:'utf8'})
            Handlebars.registerPartial(partial_name, source)
            self.partialslist.push(partial_name)
        })
        files = fs.readdirSync(this.LAYOUTS_DIR)
        files.forEach(function(file_name) {
            var partial_name = file_name.substr(0,file_name.indexOf('.'))
            var source = fs.readFileSync(`${self.LAYOUTS_DIR}/${file_name}`, {encoding:'utf8'})
            Handlebars.registerPartial(partial_name, source)
            self.partialslist.push(partial_name)
            self.layoutslist.push(partial_name)
        })
    }
}