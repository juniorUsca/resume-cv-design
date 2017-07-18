var Handlebars = require('handlebars'),
    Partials = require('./partials')

module.exports = function() {
    var self = this
    var partials = new Partials()
    partials.chargePartials()
    var layoutslist = partials.layoutslist
    var layouts = []
    
    var context = {
        title: "My New Post",
        body: "This is my first post!"
    }

    layoutslist.forEach(function(layout) {
        var template = Handlebars.compile('{{> index }}')
        var html = template (context)
        layouts[layout] = html
    });
    
    return layouts
}