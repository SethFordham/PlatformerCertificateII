//creating the player function 

var Player = function(){
		this.width = 159;
	this.height = 163;

	this.sprite = new Sprite("ChuckNorris.png");
	
	//a animation is set out like this: this.sprite.buildAnimation(width of sprite sheet, height of sprite sheet, width of individaul sprite, height of individaul sprite, 0.05, [0,1,2,3,4,5,6,7]);
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [0,1,2,3,4,5,6,7]);//left idle animation
	
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [8,9,10,11,12]); //left jump animation
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [13,14,15,16,17,18,19,20,21,22,23,24,25,26]); //left walk animation
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [52, 53, 54, 55, 56, 57, 58, 59]);//right idle
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[60, 61, 62, 63, 64]);// right jump animation
	
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]); //right walk animation 
	
	this.direction = LEFT;
	
		
	this.position = new Vector2();
	//setting the spawn of the player on join
	this.position.set(1*TILE, 8*TILE);
	
	this.width = 159;
	this.height = 163;
	this.velocity = new Vector2();
	this.angularVelocity = 0;
	this.rotation = 0; 
	
	this.offset = new Vector2();
	this.offset.set(-55,-87);
	//leave these alone
	this.falling = true;
	this.jumping = false 
	
	for (var i = 0; i < ANIM_MAX; i++) {
		this.sprite.setAnimationOffset(i,-this.width/2, -this.height/2);
	
	
	}

	
	
}
Player.prototype.changeDirectionalAnimation = function(leftAnim, rightAnim)
{
	if (this.direction == LEFT) 
	{
		if (this.sprite.currentAnimation != leftAnim) 
		{
			this.sprite.setAnimation(leftAnim);
		}
	}
	else 
	{
		if (this.sprite.currentAnimation != rightAnim) 
		{
			this.sprite.setAnimation(rightAnim);
		}
		
	}
}





//updating the player's movement using delta time and the run function 
Player.prototype.update = function(deltaTime) 
{



	this.sprite.update(deltaTime);
	var left = false;
	var right = false;
	var jump = false;
	// check keypress events
		if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
	{
			left = true;
			this.direction = LEFT;
	}
		if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
	{
			right = true;
			this.direction = RIGHT;
	}
		if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true) 
	{
			jump = true;
	}

	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var falling = this.falling;
	var ddx = 0; // acceleration
	var ddy = GRAVITY;
	
	var collisionOffset = new Vector2();
	collisionOffset.set(-TILE/2, 5);
	
	var colisionPos = this.position.add(collisionOffset);
	

	if (left)
		ddx = ddx - ACCEL; // player wants to go left
	else if (wasleft)
		ddx = ddx + FRICTION; // player was going left, but not any more
	if (right)
		ddx = ddx + ACCEL; // player wants to go right
	else if (wasright)
		ddx = ddx - FRICTION; // player was going right, but not any more
	if (jump && !this.jumping && !falling)
	{
		ddy = ddy - JUMP; // apply an instantaneous (large) vertical impulse
		this.jumping = true;
	}
	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);

	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	
	
	//animation logic
	if (this.jumping || this.falling)
	{
		this.changeDirectionalAnimation(ANIM_JUMP_LEFT, ANIM_JUMP_RIGHT);
	}
	else 
	{
		if (Math.abs(this.velocity.x) > 25) 
		{
			this.changeDirectionalAnimation(ANIM_WALK_LEFT, ANIM_WALK_RIGHT);
		}
		else
		{
			this.changeDirectionalAnimation(ANIM_IDLE_LEFT, ANIM_IDLE_RIGHT);
		}
	}

	
	
	
	
	
	
	if ((wasleft && (this.velocity.x > 0)) || (wasright && (this.velocity.x < 0)))
	{
		// clamp at zero to prevent friction from making us jiggle side to side
		this.velocity.x = 0; 
	}

	// collision detection
	// Our collision detection logic is greatly simplified by the fact that the
	// player is a rectangle and is exactly the same size as a single tile.
	// So we know that the player can only ever occupy 1, 2 or 4 cells.

	// This means we can short-circuit and avoid building a general purpose
	// collision detection engine by simply looking at the 1 to 4 cells that
	// the player occupies:
	var tx = pixelToTile(colisionPos.x);
	var ty = pixelToTile(colisionPos.y);
	var nx = colisionPos.x % TILE; // true if player overlaps right
	var ny = colisionPos.y % TILE; // true if player overlaps below
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);

	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	
	
	if ((wasleft && (this.velocity.x > 0)) || (wasright && (this.velocity.x < 0)))
	{
		// clamp at zero to prevent friction from making us jiggle side to side
		this.velocity.x = 0;
	}
	
	
	
	// collision detection
	// Our collision detection logic is greatly simplified by the fact that the
	// player is a rectangle and is exactly the same size as a single tile.
	// So we know that the player can only ever occupy 1, 2 or 4 cells.
	// This means we can short-circuit and avoid building a general purpose
	// collision detection
	// engine by simply looking at the 1 to 4 cells that the player occupies:

	// If the player has vertical velocity, then check to see if they have hit a platform
	// below or above, in which case, stop their vertical velocity, and clamp their
	// y position:
	
	if (this.velocity.y > 0) 
	{
		if ((celldown && !cell) || (celldiag && !cellright && nx)) 
		{
			// clamp the y position to avoid falling into platform below
			this.position.y = tileToPixel(ty) - collisionOffset.y;
			this.velocity.y = 0; // stop downward velocity
			this.falling = false; // no longer falling
			this.jumping = false; // (or jumping)
			ny = 0; // no longer overlaps the cells below
		}
	}
	else if (this.velocity.y < 0) 
	{
		if ((cell && !celldown) || (cellright && !celldiag && nx)) 
		{
			// clamp the y position to avoid jumping into platform above
			this.position.y = tileToPixel(ty + 1) - collisionOffset.y;
			this.velocity.y = 0; // stop upward velocity
			// player is no longer really in that cell, we clamped them to the cell below
			cell = celldown;
			cellright = celldiag; // (ditto)
			ny = 0; // player no longer overlaps the cells below
		}
	}
		
	if (this.velocity.x > 0) 
	{
		if ((cellright && !cell) || (celldiag && !celldown && ny)) 
		{
			// clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx) - collisionOffset.x;
			this.velocity.x = 0; // stop horizontal velocity
		}
	}
	else if (this.velocity.x < 0) 
	{
		if ((cell && !cellright) || (celldown && !celldiag && ny)) 
		{
			// clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx + 1) - collisionOffset.x;
			this.velocity.x = 0; // stop horizontal velocity
		}
	}
}
	


//drawing the player 
Player.prototype.draw = function() {
	this.sprite.draw(context, this.position.x, this.position.y);





}
