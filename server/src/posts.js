var fs = require('fs'),
    mkdirp = require('mkdirp'),
    Handlebars = require('handlebars'),
    Marked = require('marked'),
    Yaml = require('js-yaml')

module.exports = function (context){
    this.POSTS_DIR = '_posts'
    this.context = context
    
    this.chargePosts = function() {
        var self = this
        var files = fs.readdirSync(this.POSTS_DIR)
        files.forEach(function(file_name) {
            
            var source = fs.readFileSync(`${self.POSTS_DIR}/${file_name}`, {encoding:'utf8'})

            var splited = source.split('---')
            if (splited.length < 3) {
                console.error(`POST: The post ${file_name} don't have metadata`)
                return
            }
            
            var yaml_txt = splited.splice(0,2).join('')
            var md_txt = splited.join('---')
            
            var md_html = Marked(md_txt)
            try {
                self.context = Object.assign(self.context, Yaml.safeLoad(yaml_txt))
            } catch (e) {
                console.log(e);
                console.error(`POST: In post ${file_name}, error compiling yaml`)
                return
            }
            self.context["content"] = md_html

            var template = Handlebars.compile(`{{> ${self.context['layout']} }}`)
            var html = template (self.context)
            
            var date = new Date (self.context['date'])
            var permalink = self.context['permalink']
            var route=permalink.split('/')
            permalink = self.context['public_dir'] + '/'
            console.log(route)
            route.forEach(function(chunk){
                chunk = chunk.substring(1,chunk.length)
                console.log(chunk)
                if (chunk === "year" && !isNaN( date.getTime() ))
                    permalink += date.getFullYear().toString() + '/'
                if (chunk === "month" && !isNaN( date.getTime() )) {
                    var month = (date.getMonth()+1).toString()
                    month = (month.length===1)? '0'+month:month
                    permalink += month + '/'
                }
                if (chunk === "day" && !isNaN( date.getTime() )) {
                    var day = date.getDate().toString()
                    day = (day.length===1)? '0'+day:day
                    permalink += day + '/'
                }
                if (chunk === "title") {
                    var title = self.context['title']
                        .toLowerCase()
                        .replace(/[^\w ]+/g,'')
                        .replace(/ +/g,'-')
                    permalink += title + '/'
                }
            })

            console.log("perma",permalink)
            

            mkdirp(permalink, function (err) {
                if (err){
                    console.error(`POST: In post ${file_name}, can't create folder`)
                    return
                }
                permalink += 'index.html'
                fs.writeFile(permalink, html, function(err) {
                    if(err) {
                        console.error(`POST: In post ${file_name}, can't save post`)
                        return
                    }
                    console.log("The file was saved!");
                }); 
            });

            
        })
        
    }
}