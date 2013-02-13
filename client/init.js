
Jumper = JumperGame(30);

Jumper.resources = {};
Jumper.resources['player'] = { };
Jumper.resources['player']['image'] = "player.png";
Jumper.resources['player']['frames'] = 1;
Jumper.resources['player']['width'] = 32;

Jumper.resources['health'] = { };
Jumper.resources['health']['image'] = "health.png";
Jumper.resources['health']['frames'] = 1;
Jumper.resources['health']['width'] = 32;

Jumper.images = {};

Jumper.PreCache = function()
{

for(var a in this.resources)
{
this.images[a] = new Image();
this.images[a].src = this.resources[a]['image'];
};

};

Jumper.onDraw = function()
{
this.ctx.clearRect(0,0,640,480);
var grad = this.ctx.createLinearGradient(0,0,0,480);
  grad.addColorStop(0, '#000010');
  grad.addColorStop(1, '#000050');
  this.ctx.fillStyle = grad;
  this.ctx.fillRect(0,0,640,480);
  
};

Jumper.onConnect = function()
{
this.drawtext("Baðlandý",10,100,"rgb(255,0,0)");
};

Jumper.drawtext = function(str,x,y,col)
{
this.ctx.font = "bold 10px verdana";
this.ctx.fillStyle = col;
this.ctx.fillText(str, x, y);
};

Jumper.onCreate = function()
{
this.PreCache();
this.onKey();
};

Jumper.onKey = function()
{
var that=this;
this.keys = {};

window.onkeydown = window.onkeyup = function (ky) {
var key=ky.keyCode;

if (ky.type == "keydown")
{
that.keys[key] = 1;
}

if (ky.type == "keyup")
{
that.keys[key] = 2;
}

ky.preventDefault();
return false;
};

window.onblur = function(e) { // alttab vs. durumu için
that.keys = {};
};

};

Jumper.GetKeys = function()
{
var keys=[this.keys[87] || 0, this.keys[65] || 0, this.keys[68] || 0, this.keys[83] || 0];

for (var i in this.keys)
{
	if (this.keys[i] == 2) {
		this.keys[i] = 0;
		}
}
return keys;
};

function initGame()
{
Jumper.connect("x","x");
};