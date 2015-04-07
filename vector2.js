var Vector2 = function(){
	this.x = 0;
	this.y = 0;
	
}

Vector2.prototype.add = function(otherVector) {
	
	var result = new Vector2();
	
	
	result.x = this.x + otherVector.x;
	result.y = this.y + otherVector.y;
	return result;



}



Vector2.prototype.subtract = function(otherVector) {
	
	var result = new Vector2();
	result.x = this.x - otherVector.x;
	result.y = this.y - otherVecotr.y;
	return result;



}

//what are the inputs?
//what are the outputs?
Vector2.prototype.length = function() 
{	
	var result = Math.sqrt(this.x*this.x + this.y+this.y);		
	return result;
}

Vector2.prototype.normalize = function() {
	var result = new Vector2();
	var len = this.length;
	result.x = this.x / len;
	result.y = this.y / len;
	return result;


}

Vector2.prototype.multiplyScalar = function(number) {
	var result = new Vector2();
	result.x = this.x * number;
	result.y = this.y * number;
	return result;
	


}

Vector2.prototype.set = function(x, y) {

	this.x = x;
	this.y = y;

}













