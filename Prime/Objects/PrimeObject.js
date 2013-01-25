/*
 * Object Class
 */

Prime.Object = function(parent){
	this.parent = parent;
	this.init();
}

Prime.Object.prototype.init = function(){	
	//Create Canvas
	this.canvas = document.createElement('canvas');
	this.canvas.height = this.defaults.dimensions.height;
	this.canvas.width = this.defaults.dimensions.width;
	this.canvas.style.position = 'absolute';
	this.canvas.style.left = 0;
	this.context = this.canvas.getContext('2d');
	this.parent.viewport.appendChild(this.canvas);
}

Prime.Object.prototype.render = function(time){

}