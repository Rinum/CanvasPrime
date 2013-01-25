/*
 * Prime Class
 */
Prime = function(data){
	this.data = data;
	this.init();
}

Prime.prototype.init = function(){
	//Time of init
	this.init_time = new Date().getTime();
	
	//Get the viewport
	this.viewport = document.getElementById('viewport');
	
	//Initialize objects container
	this.object_id = 0;
	this.objects = {};
	
	//Initialize controllers container
	this.controller_id = 0;
	this.controllers = {};
	
	//Load initial controllers & objects
	this.load();
	
	//Initialize logic
	this.logic = new Prime.Logic(this);
	
	//Initialize frame
	this.frame = new Prime.Frame(this);	
}

Prime.prototype.load = function(){
	//Create initial controllers
	var controllers = [];
	controllers.push(new Prime.Controller(this));
	
	for(var i in controllers){
		this.add_controller(controllers[i]);
	}
	
	//Create initial objects	
	var objects = [];
	objects.push(new Prime.Object(this));
	
	for(var j in objects){
		this.add_object(objects[j]);
	}	
}

Prime.prototype.run = function(){
	//Time of 1st run
	this.run_time = new Date().getTime();
	
	//Initialize gameloop
	this.gameloop = function(){
		var time = new Date().getTime();
		
		this.logic.run(time);
		this.frame.render(time);
		
		requestAnimationFrame(this.gameloop);
	}.bind(this);
	
	this.gameloop_id = requestAnimationFrame(this.gameloop);
}

Prime.prototype.add_controller = function(controller){
	var id = this.controller_id++;
	this.controllers[id] = controller;
	
	return id;
}

Prime.prototype.add_object = function(object){
	var id = this.object_id++;
	this.objects[id] = object;
	
	return id;
}

/*
 * Logic Class
 * Solely responsible for running logic functions attached to objects and players
 */
Prime.Logic = function(parent){
	this.parent = parent;
	this.init();
};

Prime.Logic.prototype.init = function(){
}

Prime.Logic.prototype.run = function(time){	
	//Controller logic
	var controllers = this.parent.controllers;
	for(var j in controllers){
		if(controllers[j].run){
			controllers[j].run(time);
		}
	}
}

/*
 * Frame Class
 * Solely responsible for drawing objects on the canvas
 */

Prime.Frame = function(parent){
	this.parent = parent;	
	this.init();
};

Prime.Frame.prototype.init = function(){
	this.viewport = document.getElementById('viewport');
	this.dimensions = {
		width: this.viewport.width,
		height: this.viewport.height
	};
}

Prime.Frame.prototype.render = function(time){
	//render all objects
	var objects = this.parent.objects;
	for(var i in objects){
		if(objects[i].render){
			objects[i].render(time);
		}
	}
}