var http = require('http'),
    st = require('node-static'),
    opts = {cache: false},
    file = new st.Server('./public', opts),
    port = process.env.PORT || 8080,
    web_page = require('./src/main')

http
    .createServer(function (req, res) {
        file.serve(req, res);
    })
    .listen(port)

console.log ("App running on http://0.0.0.0:%s", port)


// Start project

web_page()