/*
 * Prime Class
 */
Prime = function(data){
	this.data = data;
	this.init();
}

Prime.prototype.init = function(){
	//Time of init
	this.init_time = new Date();
	
	//Get the viewport
	this.viewport = document.getElementById('viewport');
	
	//Initialize objects
	this.load_objects();
	
	//Initialize players
	this.players = [];
	
	//Initialize frame
	this.frame = new this.Frame(this);
	
	//Initialize gameloop
	this.gameloop = function(){		
		this.frame.render();
		
		requestAnimationFrame(this.gameloop);
	}.bind(this);
	
	this.gameloop_id = requestAnimationFrame(this.gameloop);
}

//Note: this can be overridden or edited to include more objects
Prime.prototype.load_objects = function(){
	this.objects = [];
	
	//FPS
	this.objects.push(new this.Object(this,{
		position:{
			x:0,
			y:0,
			z:0
		},
		state: {

		},
		states: {
			
		},
		defaults: {
			dimensions:{
				width: 741,
				height: 641,
				rows: 16,
				cols: 16,
				scale: 1
			}
		}
	}));
}

/*
 * Object Class
 * Interactive stuff
 * 
 * Object.position = {
 *	x: 120,
 *	y: 513,
 *	z: 1
 * };
 * 
 * Object.state = {
 *	id: 'rest', //what state is the object in?
 *	start: 0 //when the state started
 * };
 * 
 * Object.states = {
 *	'rest':{
 *		map: null,
 *		events:{
 *			click: {
 *				Object: function(){
 *					//Do something
 *				}
 *			}
 *		},
 *		render: function(start, timeAtRender){
 *			//draw object
 *		}
 *	}
 * };
 *
 * //global state settings...not needed if defined at the individual state level
 * Object.defaults = {
 *	dimensions:{
 *		width: 100,
 *		height: 100,
 *		scale: 2
 *	},
 *	//Not necessary to define map... it's there if you need finer control
 *	//In this example each block represents a 20px x 20px area
 *	map:[ //at scale = 1
 *		[0,0,0,0,0],
 *		[0,0,1,0,0],
 *		[0,1,1,[0,1],0],
 *		[0,P,1,0,0],
 *		[0,0,0,0,0]
 *	],
 *	events:{
 *		click: {
 *			1: function(){
 *				//Do something
 *			},
 *			P: function(){
 *				//Do something
 *			}
 *		}
 *	}
 * }
 */

Prime.prototype.Object = function(parent,data){
	this.parent = parent;
	this.data = data;	
	this.init();
}

Prime.prototype.Object.prototype.init = function(){
	//Parse data
	var data = this.data;
	this.defaults = data.defaults;
	this.position = data.position;
	this.state = data.state;
	this.states = data.states;
	
	//Create Canvas
	this.canvas = document.createElement('canvas');
	this.canvas.height = this.defaults.dimensions.height;
	this.canvas.width = this.defaults.dimensions.width;
	this.canvas.style.position = 'absolute';
	this.canvas.style.left = 0;
	this.context = this.canvas.getContext('2d');
	this.parent.viewport.appendChild(this.canvas);
}

Prime.prototype.Object.prototype.render = function(time){

}

/*
 * Frame Class
 * Solely responsible for drawing objects on the canvas
 */

Prime.prototype.Frame = function(parent){
	this.parent = parent;	
	//this.init();
};

Prime.prototype.Frame.prototype.init = function(){
	this.viewport = document.getElementById('viewport');
	this.dimensions = {
		width: this.element.width,
		height: this.element.height
	};
}

Prime.prototype.Frame.prototype.render = function(){
	var time = new Date();
	
	//render all objects
	var objects = this.parent.objects;
	for(var i in objects){
		objects[i].render(time);
	}
}

/*
 * Player Class
 */
Player = function(parent){
	this.parent = parent;
}