//creating the enemy object
var Enemy = function() {
	this.image = document.createElement("img")
	this.pos = new Vector2();
	this.pos.set(SCREEN_WIDTH * 0.25, SCREEN_HEIGHT/2);
	
	this.width = 159;
	this.height = 163;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0; 
	
	this.image.src = "enemy.png";
	






}



//drawing the enemy
Enemy.prototype.draw = function() {
	context.save();
	context.translate(this.pos.x, this.pos.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
	


}
//updating the enemy's movements 
Enemy.prototype.update = function(deltaTime) {


if ( keyboard.isKeyDown(keyboard.KEY_SPACE)) {

	this.rotation -= deltaTime;
	}
	else {
	
	this.rotation += deltaTime;
	
	}
	
}