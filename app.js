const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 8888

const server = http.createServer((req, res) => {
    if(req.url === "/script.js") {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/javascript')
        fs.createReadStream("./script.js").pipe(res)
    } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream("./index.html").pipe(res)
    }
})

server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`)
})
