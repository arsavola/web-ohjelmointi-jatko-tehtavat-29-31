var http = require("http");
var fs = require("fs");
var util=require('util');
//var express = require("express");

http.createServer(function(request, response){

    // Luetaan html filu ja palautetaan se selaimelle
    // Toki tässä ei ole järkeä, koska filu voidaan lukea suoraankin
    /*
    fs.readFile("test.htm", function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();    
    });*/

    //var x = util.inspect(request);
    //console.log("x : " + x);

    const { headers, url, method } = request;
    console.log("headers : " + JSON.stringify(headers) + ", url:" + url + ", method:" + method);

    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end("nimi:Maija|osoite:Opistotie 2|ponro:71800");

    // Alla "täydellistä html:ää"
/*
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write("<!doctype>")
    response.write("<html><head><title>Eka sivu</title><head>");
    response.write("<body><p>Terve maailma, muista content-type</p></body></html>");
    response.end();    
*/    
}).listen(3002);

console.log("Server running at http://localhost:3002");