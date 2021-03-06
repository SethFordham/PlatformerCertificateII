var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;
//settings for the tileset 
var LAYER_COUNT = 3;
var  MAP = {tw:85, th:15}
var TILE = 35;
var TILESET_TILE = 70;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var LEFT = 0;
var RIGHT = 1;
var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_MAX = 6;


var keyboard = new Keyboard();
var player = new Player();
var enemy = new Enemy();
var timer = 0;



var bgMusic = new Howl({
	urls:["background.ogg"],
	loop:true,
	buffer:true,
	volume:0.5





});

bgMusic.play();



//setting the tileset picture
var tileset = document.createElement("img");
tileset.src = "tileset.png";


function cellAtPixelCoord(layer, x,y) {
	if (x < 0 || x > SCREEN_WIDTH || y < 0) 
		return 1;
	
	
	if (y>SCREEN_HEIGHT)
		return 0;
		return cellAtTileCoord(layer, p2t(x), p2t(y));
}
function cellAtTileCoord(layer, tx, ty) {
	if(tx<0 || tx>=MAP.tw || ty<0)
		return 1;
	if(ty>=MAP.th)
		return 0;
	
	return cells[layer][ty][tx];
}
function tileToPixel(tile) {
	return tile * TILE;
}
function pixelToTile(pixel) {
	return Math.floor(pixel/TILE);
}
function bound(value, min, max) {
	if (value < min) 
		return min;
	
	if (value > max) 
		return max;
	return value;
}


//these are the layers of the tiles
var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;
//Use  hese to change some factors
var METER = TILE;
var GRAVITY = METER * 9.8 * 3;
var MAXDX = METER * 10;
var MAXDY = METER * 16;
var ACCEL = MAXDX * 1;
var FRICTION = MAXDX * 2;
var JUMP = METER * 1500;




if (deltaTime = 0.02) {

	deltaTime = 0.02;

}



//call this to draw the tileset/map
function drawMap(offsetX, offsetY) {
 for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
 {
 var idx = 0;
 for( var y = 0; y < level1.layers[layerIdx].height; y++ )
 {
 for( var x = 0; x < level1.layers[layerIdx].width; x++ )
 {
 if( level1.layers[layerIdx].data[idx] != 0 )
 {
 // the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
 // correct tile
 var tileIndex = level1.layers[layerIdx].data[idx] - 1;
 var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
 var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
 
 var dx = x*TILE - offsetX;
 var dy = (y-1)*TILE - offsetY;
 
 context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, dx, dy, TILESET_TILE, TILESET_TILE);
 }
 idx++;
 }
 }
	
 
 
 }







}




var cells = [];
function initialize() {
	for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
		cells[layerIdx] = [];
		var idx = 0; 
		for(var y = 0; y < level1.layers[layerIdx].height; y++) {
		cells[layerIdx][y] = [];
			for(var x = 0; x < level1.layers[layerIdx].width; x++) {
				if (level1.layers[layerIdx].data[idx] != 0) {
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
		}
		else if (cells[layerIdx][y][x] != 1) {
		cells[layerIdx][y][x] = 0;
		}
		idx++;
		}
	}
	}
	
	
	
}






function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	timer += deltaTime;
	
	//context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);
	
	var mad = player.deathCount * timer;
	
	
	var scrollX = player.position.x - canvas.width/2 
	var scrollY = 0;
	
	if ( scrollX < 0 )
		scrollX = 0;
		
	if ( scrollX > MAP.tw * TILE - canvas.width )
		scrollX = MAP.tw * TILE - canvas.width;
	
	scrollX += Math.random()*mad + 0.1;
	scrollY += Math.random()*mad + 0.1;
	
	drawMap(scrollX,scrollY);
	player.update(deltaTime);
	
	
	player.draw(scrollX,scrollY);
	enemy.update(deltaTime);
	enemy.draw();
	

	context.fillStyle="black";
	context.font="32px Arial";
	var timerText = "Time: " + Math.floor(timer);
	context.fillText(timerText, 30,40);

	
	
	context.fillStyle = "red";
	
	context.font="32px Arial"
	var rageometer = "Rage O' Meter";
	context.fillText(rageometer, canvas.width/2 - 100, canvas.height/2 -225);
	context.stroke();
	
	
	
	
	
	
	
	
	
	context.fillStyle = "red";
	context.beginPath();
	context.rect(canvas.width/2-mad/2, 30, mad+1, 31);
	context.fillRect(canvas.width/2-mad/2, 30, mad, 30);
	context.stroke();
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// drawing the FPS bar in the top right hand corner
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
	var check1 = false;
	var check2 = false;
	var check3 = false;
	var checks = 0;
	
	

	
	
	if (player.position.x >= TILE * 42) {
		context.fillStyle = "#f00";
	context.font="50px Arial";
	context.fillText("Congratulations you Won", SCREEN_HEIGHT/2, SCREEN_WIDTH/2, 100);
	
	
	
	}
	if (mad >= 1280) {
			context.fillStyle = "#f00";
	context.font="50px Arial";
	context.fillText("GAME OVER", SCREEN_HEIGHT/2, SCREEN_WIDTH/2, 100)
	mad = 0;
	
	}
	
	
	
}
initialize();


//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
