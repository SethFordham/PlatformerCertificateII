/*
this file is basically a library of functions that can be called to do long equations in
a small space and makes the code more readable 

*/


var Vector2 = function(){
	this.x = 0;
	this.y = 0;
	
}
//the input in the add function are 2 vectors: Vector2 and another vector that this function receives
Vector2.prototype.add = function(otherVector) {
	
	var result = new Vector2();
	
	
	result.x = this.x + otherVector.x;
	result.y = this.y + otherVector.y;
	return result;



}
//the result of the add function is a new vector


//the inputs for the subtract function are 2 vectors
Vector2.prototype.subtract = function(otherVector) {
	
	var result = new Vector2();
	result.x = this.x - otherVector.x;
	result.y = this.y - otherVecotr.y;
	return result;
//the outputs are a new vector


}

//the input to a length finding function is 1 vector
Vector2.prototype.length = function() 
{	
	var result = Math.sqrt(this.x*this.x + this.y+this.y);		
	return result;
	//the output is a scalar
}
//the input to a normalizer is a vector + its length
Vector2.prototype.normalize = function() {
	var result = new Vector2();
	var len = this.length;
	result.x = this.x / len;
	result.y = this.y / len;
	return result;
// the output is a scalar

}
// the input is a number and Vector2
Vector2.prototype.multiplyScalar = function(number) {
	var result = new Vector2();
	result.x = this.x * number;
	result.y = this.y * number;
	return result;
// the output is a scalar


}
//this basically will set the x and y variables of a vector with the given numbers
Vector2.prototype.set = function(x, y) {

	this.x = x;
	this.y = y;

}













