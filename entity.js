
var ClientObj = Jumper.Entity('player');

ClientObj.onCreate = function(dat)
{
this.id=dat[0];
if (this.id == this.game.id)
{
this.game.player=this;
}

};

ClientObj.onUpdate = function(dat)
{

};

ClientObj.onDestroy = function()
{

};

ClientObj.onDraw = function()
{
if (this.imageset != 0)
{
	var img=Jumper.resources[this.imageset]['image'];
	var imgw=Jumper.resources[this.imageset]['width'];
	var imgx=imgw * this.frame;
	
	this.game.ctx.save();
	/*this.game.ctx.translate(this.x + imgx + (imgw * 0.5), this.y + Jumper.images[img].height * 0.5);
	this.game.ctx.rotate(this.angle);
	this.game.ctx.scale(this.xscale,this.yscale);
	this.game.ctx.translate(-imgx - (imgw * 0.5) * 0.5, -Jumper.images[img].height * 0.5);*/
	//this.game.ctx.drawImage(Jumper.images[img],imgx,0,imgw,Jumper.images[img].height,0,0,imgw,Jumper.images[img].height);
	this.game.ctx.drawImage(Jumper.images[this.imageset],this.x,this.y);
	this.game.ctx.restore();
}
};


var HealthObj = Jumper.Entity('health');

HealthObj.onCreate = function(dat)
{

};

HealthObj.onUpdate = function(dat)
{

};

HealthObj.onDraw = function(dat)
{
if (this.imageset != 0)
{
	var img=Jumper.resources[this.imageset]['image'];
	var imgw=Jumper.resources[this.imageset]['width'];
	var imgx=imgw * this.frame;
	
	this.game.ctx.save();
	/*this.game.ctx.translate(imgx + (imgw * 0.5), Jumper.images[this.imageset].height * 0.5);
	this.game.ctx.rotate(this.angle);
	this.game.ctx.scale(this.xscale,this.yscale);
	this.game.ctx.translate(-imgx - (imgw * 0.5) * 0.5, -Jumper.images[this.imageset].height * 0.5);
	this.game.ctx.drawImage(Jumper.images[this.imageset],imgx,0,imgw,Jumper.images[this.imageset].height,0,0,imgw,Jumper.images[this.imageset].height);*/
	this.game.ctx.drawImage(Jumper.images[this.imageset],this.x,this.y);
	this.game.ctx.restore();
}
};