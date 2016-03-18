//var http=require("http");
//var fs=require("fs");
//var url=require("url");
//var server=http.createServer(function(request,response){
// var urlObj=url.parse(request.url,true);
//  var pathname=urlObj.pathname;
//  var pathQuery=urlObj.query;
//  if(pathname==="/index.html"){
//    var con = fs.readFileSync("./qqzone.html", "utf8");
//    response.writeHead(200, {"content-type": "text/html"});
//    response.end(con);
//    return;
//  }
//  if(pathname==="/getTopCss"){console.log(pathname);
//    var con = fs.readFileSync("./css/top-container.css", "utf8");
//    response.writeHead(200, {"content-type": "text/css"});console.log(con);
//    response.end(con);
//    return;
//  }
//  if(pathname==="/getBodyCss"){console.log(pathname);
//    var con = fs.readFileSync("./css/body-container.css", "utf8");
//    response.writeHead(200, {"content-type": "text/css"});
//    response.end(con);
//    return;
//  }
//  if(pathname==="/getJs"){console.log(pathname);
//    var con = fs.readFileSync("./js", "utf8");
//    response.writeHead(200, {"content-type": "text/javascript"});
//    response.end(con);
//    return;
//  }
//  if(pathname==="/topicInfo"){
//    var count=pathQuery.count;
//    var page=pathname.page;
//    var data=fs.readFileSync("./data/topic.json","utf8");
//    data=JSON.parse(data);
//    var totalPage=Math.ceil(data.length/count);
//    var ary=[];
//    for(var i=(page-1)*count;i<page*count-1;i++){
//      var cur=data[i];
//      if(i>data.length-1){
//        break;
//      }
//      ary.push(cur);
//    }
//    var res={
//      "totalPage":totalPage,
//      "list":ary
//    };
//    response.writeHead(200,{"content-type":"application/json"});
//    response.end(JSON.stringify(res));
//    return;
//  }
//
//
//});
//server.listen(2000);