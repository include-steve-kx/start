//var border_class = require("border.js");

// module aliases
var Engine = Matter.Engine,
// Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var spheres = [];

var bottom, left, right;

function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;

	left = new Border(PI/2, 100, 0);
	right = new Border(PI/2, 100, windowWidth);
	bottom = new Border();

	tutuorialLetters();

	textFont('Georgia');
	// Create a anchor object using createA() function
    link = createA("RatGame.html","The last 2 hrs of a rat", "_blank"); 
    link.position(120, 80);
    textFont('Helvetica');
    link = createA("VRGame.html","What would you do if...", "_blank"); 
    link.position(120, 120);
    link = createA("FindOut.html","When you find out that you find out that yourre in a game yourre in a game", "_blank"); 
    link.position(120, 160);
    link = createA("Road.html","Road.mp4", "_blank"); 
    link.position(120, 200);
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }


function draw() {
	background(255);
	Engine.update(engine);
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].show();
	}
	for (var i = 0; i < spheres.length; i++) {
		spheres[i].show();
	}
	//left.show();
	//right.show();
	//left.show()
	bottom.show();
	left.show();

}

function tutuorialLetters(){
	var letter_width = 20;
	var letter_height = letter_width/4*5;
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "T"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "r"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "y"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "T"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "y"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "p"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "i"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "n"));
	boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, "g"));
}


function mouseDragged() {
	
}

function keyPressed() {
	if (key >= 'A' && key <= 'Z'){
		// upper-case letter png dimension is 20 * 25, if hard-coding requires
		// therefore, set letter-width : letter-height ratio = 4 : 5 when initializing the
		// box object associated with each letter added to the physics engine
		//var letter_width = random(15, 30);
		var letter_width = 20;
		var letter_height = letter_width/4*5;
		boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, key));
		//spheres.push(new Sphere(random(windowWidth), random(windowHeight), random(10, 30), key));
	}
	else if (key >= 'a' && key <= 'z'){
		//var letter_width = random(12, 24);
		var letter_width = 20;
		var letter_height = letter_width;
		boxes.push(new Box(random(windowWidth), random(-150, 0), letter_width, letter_height, key));
	}
}