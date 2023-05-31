const url = require('url');
const fs = require('fs');

class OBJ{
    constructor(obj){
        for(let i of Object.keys(obj)){
            this[i] = obj[i]
        }
        this.domain= this.req.headers.host
        this.url= decodeURIComponent(this.req.url.split("?")[0])
        this.urlary = decodeURIComponent(this.url).split(/\//g)
        this.urlary.shift()
        this.baseurl= this.urlary[0]
//         this.baseurl= decodeURIComponent(this.req.url).split(/\/|\?/g)[1]
        this.qry=url.parse(this.req.url,true).query
        let arysurl = decodeURIComponent(this.req.url).split("?")[0].split(this.baseurl)
        arysurl.shift()
        this.surl = arysurl.join(this.baseurl)
        let ext = this.url.split(".")
        if(ext.lenght > 1){
            this.ext = ext.pop()
        }
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
      gif:"image/gif",
      ico:"image/x-icon",
      ttf:"font/ttf",
      woff:"font/woff",
      woff2:"font/woff2",
      mp3:"audio/mpeg",
      mp4:"video/mp4",
      webm:"video/webm",
      wav:"audio/wav",
      ogg:"audio/ogg",

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
read_body_json(obj, cb) {
        let body = "";
        let self = this;
        this.req.on("data", function (data) {
            body += data;
        });
        this.req.on("end", function () {
            self.body = body;
            try{
                self.post = JSON.parse(body);
            }catch(e){
                console.error(e)
            }
            cb(obj);
        });
    }
read_body(obj, cb) {
        let body = "";
        let self = this;
        this.req.on("data", function (data) {
            body += data;
        });
        this.req.on("end", function () {
            self.body = body;
            try{
                self.post = JSON.parse(body);
            }catch(e){
                self.post = body
            }
            cb(obj);
        });
    }
        sendFile(obj) {
        obj.path = obj.path.replace(/\.\./gm, "")
        let self = this
         let file_reader = (obj.file_reader||fs.readFile)
         this.file_content_type = (this.file_content_type || this.ext || "html")
        file_reader(obj.path, (err, data) => {
           if (err) {
                console.log(err);
               let err_func = (obj.file_err||self.send500)
               err_func(err,obj)
            } else {
                if (self.file_content_type) {
                    self.res.writeHead(200, { 'content-type': self.file_content_type })
                } else if (self.contentType[self.ext]) {
                    self.res.writeHead(200, { 'content-type': self.contentType[self.ext] })
                } else {
                    self.res.writeHead(200, { 'content-type': 'text/html' })
                }
                self.res.write(data);
                self.res.end()
            }
        });

    }

    
    
    
}
module.exports = OBJ
