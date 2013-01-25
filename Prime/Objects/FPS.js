FPS = function(controller){
	this.controller = controller;	
	this.init();
}

FPS.prototype.init = function(){
	//Initialize vars
	this.fps = 0;
	
	//Create Canvas
	this.canvas = document.createElement('canvas');
	this.canvas.height = 100;
	this.canvas.width = 100;
	this.canvas.style.position = 'absolute';
	this.canvas.style.left = 0;
	this.context = this.canvas.getContext('2d');
	
	//Place canvas
	document.getElementById('viewport').appendChild(this.canvas);
}

FPS.prototype.render = function(time){
	var canvas = this.canvas;
	var context = this.context;
	context.fillStyle = "#ffffff";
	context.font = "18pt Arial";
	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillText(this.fps + " FPS", 0, 18);
}