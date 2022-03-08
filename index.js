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
        let arysurl = decodeURIComponent(this.req.url).split("?")[0].split(this.baseurl)
        arysurl.shift()
        this.surl = arysurl.join(this.baseurl)
        if(this.req.headers.referer){
            this.referer = this.req.headers.referer,
            this.referer_domain = this.req.headers.referer.split("/")[2],
            this.referer_url=this.req.headers.referer.split(this.referer_domain)[1],
            this.referer_baseurl= decodeURIComponent(this.referer_url).split(/\/|\?/g)[1]
            this.referer_qry = url.parse(this.referer_url, true).query
            let aryreferer_surl = decodeURIComponent(this.referer_url).split("?")[0].split(this.referer_baseurl)
            aryreferer_surl.shift()
            this.referer_surl = aryreferer_surl.join(this.referer_baseurl)

            // this.referer_surl = decodeURIComponent(this.referer_url).split("?")[0].split(this.referer_baseurl)[1]
        }
        this.func = {
            count:0,
            list:[]
        }
        this.contentType = {
      html: "text/html",
      js: "text/javascript",
      css: "text/css",
      json: "application/json",
      png: "image/png",
      jpg: "image/jpg",
      wav: "audio/wav",
      svg: "image/svg+xml",
      svgz: "image/svg+xml",
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
read_body(obj, cb) {
        let body = "";
        let self = this;
        this.req.on("data", function (data) {
            body += data;
        });
        this.req.on("end", function () {
            self.body = body;
//             try{
                self.post = JSON.parse(body);
//             }catch(e){
//                 console.error(e)
//             }
            cb(obj);
        });
    }
}
module.exports = OBJ
