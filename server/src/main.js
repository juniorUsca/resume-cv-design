var Partials = require('./partials'),
    Config = require('./config'),
    Posts = require('./posts'),
    Pages = require('./pages'),
    Utils = require('./utils')

module.exports = function(server, development) {
    var context = {
        "public_dir": "build",
        "layout": "default",
    }
    var config = Config()
    var partials = new Partials()
    partials.chargePartials()

    context = Object.assign(context, config)
    if (development)
        context["development"] = "true"

    Utils.deleteFolderRecursive(context['public_dir'])
    var posts = new Posts(context)
    posts.chargePosts()
    var pages = new Pages(context)
    pages.chargePages()
    Utils.copy(context['public_dir']+'/assets','theme/assets')
}