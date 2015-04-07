var enemy = function() {
	this.image = document.createElement("img")
	this.pos = new Vector2;
	this.pos.set(SCREEN_WIDTH/2, SCREEN_HEIGHT/2)
	
	this.width = 159;
	this.height = 163;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0; 
	
	this.image.src = "enemy.png";
	






}