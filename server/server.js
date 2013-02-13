
"use strict";
process.title = 'jumper';

var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');

function Server()
{
this.clients = {};
this.games = {};
this.ws = 0;
this.server = 0;
this.maxclient = 50;
this.clientc = 0;
this.clientID = 0;

var that=this;
this.server = http.createServer(function(request, response) { // ws'den önce httpserver yaratýyoz
	});
	
this.server.listen(webSocketsServerPort, function() {
		console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
	});

this.ws = new webSocketServer({
		httpServer: this.server
	});
	

this.ws.on('request', function(request) {
	var conn=request.accept(null,request.origin);
	
	conn.ClientID = that.AddCli(conn);
	
	conn.on('message',function(msg) {
	that.clients[conn.ClientID].HandleMsg(msg);
	
	});
	
	conn.on('close',function(conn) {
	that.RemoveCli(conn.ClientID);
	
	});


});
	
}

Server.prototype.AddCli = function(conn) {
this.ClientID++;
this.clients[ClientID] = new Client(this,conn);
this.clientc++;
return this.ClientID;
	
};

Server.prototype.RemoveCli = function(id) {
if (this.clients[id])
{
	this.clientc--;
	this.clients[id].destroy();
	delete this.clients[id];
}
};

Server.prototype.init = function()
{

};




function Client(srv,sck)
{
this.serv=srv;
this.sock=sck;
this.game=-1;
this.id=srv.ClientID;

};



function Game()
{
this.clients={};

};

var Serv = new Server();


