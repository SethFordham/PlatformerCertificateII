//creating the enemy object
var Enemy = function() {
	this.image = document.createElement("img")
	this.image.src="enemy.png";

	this.width = 800;
	this.height = 600;
	
	this.position = new Vector2();
	this.velocity = new Vector2();

	this.direction = RIGHT;

}

Enemy.prototype.update = function(deltaTime) {

	var acceleration = new Vector2();
	var enemyAccel = 4000;
	var enemyDrag = 10;
	if (this.direction == RIGHT) {
		acceleration.x = enemyAccel;
		
	
	
	
	}
	else {
		acceleration.x = -enemyAccel;	
	
	}
	
	
	var dragX = this.velocityx * enemyDrag;
	acceleration.x -= dragX;
	this.velocity = this.velocity.add(acceleration.multiplyScalar(deltaTime));
	this.position = this.position.add(this.velocity.multiplyScalar(deltaTime));
	
	
	
}



Enemy.prototype.draw = function(offsetx, offsety) {

	context.drawImage(this.image, this.position.x - offsetx, this.position.y-offsety);

	


}
