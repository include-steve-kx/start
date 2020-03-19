let letter;

function setup() {
	createCanvas(displayWidth, displayHeight);
	//createSprite(400, 200, 50, 50);
	letter = loadImage('A.png');
}

function draw() {
	//background(255, 255, 255)
	//drawSprites();
	image(letter, 100, 100);
	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255);
	}
	ellipse(mouseX, mouseY, 80, 80);
}