const url = require('url');

class OBJ{
    constructor(obj){
        for(i of Object.keys(obj)){
            this[i] = obj[i]
        }
        this.domain= this.req.headers.host
        this.url= decodeURIComponent(this.req.url.split("?")[0])
        this.baseurl= decodeURIComponent(this.req.url).split(/\/|\?/g)[1]
        this.qry=url.parse(this.req.url,true).query
        this.surl = decodeURIComponent(this.req.url).split("?")[0].split(this.baseurl)[1]
    }
    send403(){
        this.res.writeHead(403)
        this.res.end()
    }
    send404(){
        this.res.writeHead(404)
        this.res.end()
    }
    send500(){
        this.res.writeHead(500)
        this.res.end()
    }

}
module.exports = OBJ