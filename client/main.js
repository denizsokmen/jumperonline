
var IPhone = false; // ilerde destek eklerim.
var GAMENAME = "Jumper";
var MENUFONT = "Arial";
//var client; 

/*window.onload = function(e) {
client=new Client();
client.NewGame();
}*/

var MSG_CREATE_ENTITY = 0;
var MSG_UPDATE_ENTITY = 1;
var MSG_DESTROY_ENTITY = 2;
var MSG_INIT = 3;
var MSG_KEY = 4;

function Game (cli)
{
this.id = -1;
this.client = cli;
this.player=null;
this.started=false;
//this.init();
};

Game.prototype.onCreate=function () { };
Game.prototype.onDraw=function () { };
Game.prototype.onConnect=function () { };
Game.prototype.GetKeys=function() { };

Game.prototype.init=function()
{
this.canvas=document.getElementById("canvas");
this.ctx = this.canvas.getContext("2d"); 


this.onCreate();
};


Game.prototype.drawgame=function()
{

};


Game.prototype.connect=function(IP,PORT)
{
this.client.connect("127.0.0.1",1337);
};

Game.prototype.BaseEntity = function()
{
this.onCreate = function(dat) {};
this.onUpdate = function(dat) {};
this.onDestroy = function(dat) {};
}

Game.prototype.Entity = function(id)
{
return this.client.EntityTypes[id] = new this.BaseEntity();
};

function Entity (cli,dat)
{
this.game=cli.game;
var dl=dat[0];
this.id=dl[0];
this.imageset=dat[0][7];

for(var e in cli.EntityTypes[dat[0][7]])
{
	if (e != 'update' && e != 'destroy')
	{
	this[e] = cli.EntityTypes[dat[0][7]][e];
	}
}

	this.onCreate(dat[1]);
};

Entity.prototype.update = function(dat)
{
	var d=dat[0];
	this.x=d[1];
	this.y=d[2];
	this.angle=d[3];
	this.color=d[4];
	this.xscale=d[5];
	this.yscale=d[6];
	this.imageset=d[7];
	this.frame=d[8];
	this.onUpdate(dat[1]);
};

Entity.prototype.destroy = function()
{
	this.onDestroy();
};


/* network*/
function Client()
{
this.sock = null;
this.connected = false;
this.game=null;
this.timer=null;
this.player=null;
this.init();
this.lastpacket=0;
};

Client.prototype.NewGame = function(fp)
{
this.fps=fp;
return this.game = new Game(this);
};

Client.prototype.init = function()
{
this.Entities = {};
this.EntityTypes = {};
};

Client.prototype.connect = function(ip,port)
{
this.game.init();
var that=this;
	try
	{  
  
    that.sock = new WebSocket("ws://"+ip+":"+port);  
    that.sock.onopen = function()
	{  
	that.connected=true;
	that.sock.send(JSON.stringify([MSG_INIT]));
	that.game.onConnect();

    }  
  
  
    that.sock.onmessage = function(msg)
	{  
	that.Recv(msg);
    }  
  
    that.sock.onclose = function()
	{  
	that.connected=false;
    }       
	
  
    } catch(exception){  
	that.connected=false;
    }
};

Client.prototype.Send = function(type,msg) // network
{
msg.unshift(type);

this.sock.send(JSON.stringify(msg));

};

Client.prototype.Recv = function(msg) // network
{
	var dat=JSON.parse(msg.data);
	var mid = dat.shift();
	if (mid == MSG_INIT)
	{
		var dut = this;
		this.game.playerid=dat[0];
		this.game.started=true;
		this.timer=setTimeout(function() { dut.update(); },1);
	}
	
	if (mid == MSG_CREATE_ENTITY)
	{
	
	for (var a = 0, l = dat.length; a < l; a++)
	{
	
		var n = dat[a];
		this.Entities[n[0][0]] = new Entity(this,n);
	}
	}
	else if (mid == MSG_UPDATE_ENTITY)
	{
	for (var a = 0, l = dat.length; a < l; a++)
	{
		var n = dat[a];
		this.Entities[n[0][0]].update(n);
	}
	}
	else if (mid == MSG_DESTROY_ENTITY)
	{
	for (var a = 0, l = dat.length; a < l; a++)
	{
		var n = dat[a];
		this.Entities[n[0]].destroy();
		delete this.Entities[n[0]];
	}
	} 

	
};

Client.prototype.update = function()
{
var that=this;

this.game.onDraw();

if (this.game.started == true)
{
	for(var c in this.Entities)
	{
	var a=this.Entities[c];
	a.onDraw();
	}
	
	
	var dat=this.game.GetKeys();
	dat.unshift(MSG_KEY);
	dat = JSON.stringify(dat);
	if (dat != this.lastpacket)
	{
		this.lastpacket=dat;
		this.sock.send(dat);
		
	}
}

this.timer=setTimeout(function() { that.update(); }, 1000/this.fps);
};

window.JumperGame = function(fps) {
var client = new Client();
return client.NewGame(fps);
};

//JumperGame();
/***************/
/*
ID : 0 (create obj)
PID : x (obj id)
{Type : str, X : int, Y : int}
{Özellikler array}



*/