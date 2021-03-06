//the keyboard function that holds all keycode and corresponding events
var Keyboard = function() {

var self = this;

	window.addEventListener('keydown', function(evt) {self.onKeyDown(evt);}, false);
	window.addEventListener('keyup', function(evt) {self.onKeyUp(evt); }, false);
	//the keys array that holds the keycode's 
	this.keys = new Array();
	
	this.KEY_SPACE = 32;
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;	
	this.KEY_A = 65;
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;
	this.KEY_SHIFT = 16;	
}



//these are events that register holding down keys e.g. space or up
Keyboard.prototype.onKeyDown = function(evt){
	this.keys[evt.keyCode] = true;


} 

Keyboard.prototype.onKeyUp = function(evt) {
	this.keys[evt.keyCode] = false;
}

Keyboard.prototype.isKeyDown = function(keyCode) {
	return this.keys[keyCode];
}