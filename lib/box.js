possible_letter_images = [
  "FuturaBoldLetters/A.png", "FuturaBoldLetters/B.png", "FuturaBoldLetters/C.png", 
  "FuturaBoldLetters/D.png", "FuturaBoldLetters/E.png", "FuturaBoldLetters/F.png", 
  "FuturaBoldLetters/G.png", "FuturaBoldLetters/H.png", "FuturaBoldLetters/I.png", 
  "FuturaBoldLetters/J.png", "FuturaBoldLetters/K.png", "FuturaBoldLetters/L.png", 
  "FuturaBoldLetters/M.png", "FuturaBoldLetters/N.png", "FuturaBoldLetters/O.png", 
  "FuturaBoldLetters/P.png", "FuturaBoldLetters/Q.png", "FuturaBoldLetters/R.png", 
  "FuturaBoldLetters/S.png", "FuturaBoldLetters/T.png", "FuturaBoldLetters/U.png", 
  "FuturaBoldLetters/V.png", "FuturaBoldLetters/W.png", "FuturaBoldLetters/X.png", 
  "FuturaBoldLetters/Y.png", "FuturaBoldLetters/Z.png",
];

function Box(x, y, w, h, key="default") {
  var options = {
    friction: 0.3,
    restitution: 0.6
  };
  if(key >= 'A' && key <= 'Z') {
    //console.log(key);
    this.image = loadImage(`FuturaBoldLetters/upper-cases/${key}.png`);
  }
  else if(key >= 'a' && key <= 'z') {
    //console.log(key);
    this.image = loadImage(`FuturaBoldLetters/lower-cases/${key}.png`);
  }
  else if(key >= '0' && key <= '9') {
    //console.log(key);
    this.image = loadImage(`FuturaBoldLetters/numbers/${key}.png`);
  }
  else {
    //this.image = loadImage(possible_letter_images[floor(random(possible_letter_images.length))]);
  }
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
  //Matter.Body.scale(this.body, 2, 2);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(255, 102, 0);
    //rect(0, 0, this.w, this.h);
    image(this.image, -this.w/2, -this.h/2, this.h*this.image.width/this.image.height, this.h);
    //image(this.image, -this.w/2, -this.h/2, this.w, this.h);
    //image(this.image, -this.image.width/2, -this.image.height/2, this.image.width, this.image.height);
    pop();
  };
}