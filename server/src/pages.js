var fs = require('fs'),
    mkdirp = require('mkdirp'),
    Handlebars = require('handlebars'),
    Marked = require('marked'),
    Yaml = require('js-yaml')

module.exports = function (context) {
    this.PAGES_DIR = '_pages'
    this.context = context
    
    this.chargePages = function() {
        var self = this
        var files = fs.readdirSync(this.PAGES_DIR)
        files.forEach(function(file_name) {
            self.context = context
            var source = fs.readFileSync(`${self.PAGES_DIR}/${file_name}`, {encoding:'utf8'})

            var splited = source.split('---')
            if (splited.length < 3) {
                console.error(`PAGE: The page ${file_name} don't have metadata`)
                return
            }
            
            var yaml_txt = splited.splice(0,2).join('')
            var md_txt = splited.join('---')
            
            var md_html = Marked(md_txt)
            try {
                self.context = Object.assign(self.context, Yaml.safeLoad(yaml_txt))
            } catch (e) {
                //console.log(e)
                console.error(`PAGE: In page ${file_name}, error compiling yaml`)
                return
            }
            self.context["content"] = md_html

            var template = Handlebars.compile(`{{> ${self.context['layout']} }}`)
            var html = template (self.context)
            
            var permalink = self.context['public_dir']
            if (!self.context['permalink']) {
                var title = self.context['title']
                    .toLowerCase()
                    .replace(/[^\w ]+/g,'')
                    .replace(/ +/g,'-')
                permalink += '/' + title + '/'
            } else
                permalink += self.context['permalink']
            
            mkdirp(permalink, function (err) {
                if (err){
                    console.error(`PAGE: In page ${file_name}, can't create folder`)
                    return
                }
                permalink += 'index.html'
                fs.writeFile(permalink, html, function(err) {
                    if(err) {
                        console.error(`PAGE: In page ${file_name}, can't save page`)
                        return
                    }
                    console.log(`PAGE: ${file_name} was saved`)
                }); 
            });

            
        })
        
    }
}