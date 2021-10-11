const url = require('url');

class OBJ{
    constructor(obj){
        for(let i of Object.keys(obj)){
            this[i] = obj[i]
        }
        this.domain= this.req.headers.host
        this.url= decodeURIComponent(this.req.url.split("?")[0])
        this.baseurl= decodeURIComponent(this.req.url).split(/\/|\?/g)[1]
        this.qry=url.parse(this.req.url,true).query
        this.surl = decodeURIComponent(this.req.url).split("?")[0].split(this.baseurl)[1]
        if(this.req.headers.referer){
            this.referer = this.req.headers.referer,
            this.referer_domain = this.req.headers.referer.split("/")[2],
            this.referer_url=this.req.headers.referer.split(this.referer_domain)[1],
            this.referer_baseurl= decodeURIComponent(this.referer_url).split(/\/|\?/g)[1]
            this.referer_qry=url.parse(this.referer_url,true).query
            this.referer_surl = decodeURIComponent(this.referer_url).split("?")[0].split(this.referer_baseurl)[1]
        }
        this.func = {
            count:0,
            list:[]
        }
    
    }
    send403(err){
        this.res.writeHead(403)
        this.res.end(err)
    }
    send404(err){
        this.res.writeHead(404)
        this.res.end(err)
    }
    send500(err){
        this.res.writeHead(500)
        this.res.end(err)
    }

}
module.exports = OBJ