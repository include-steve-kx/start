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

function Sphere(x, y, r, key="default") {
  var options = {
    friction: 0.3,
    restitution: 0.6
  };
  if(key >= 'A' && key <= 'Z') {
    //console.log(key);
    this.image = loadImage(`FuturaBoldLetters/upper-cases/${key}.png`);
    this.body = Bodies.circle(x, y, r/1.2, options);
  }
  else if(key >= 'a' && key <= 'z') {
    //console.log(key);
    this.image = loadImage(`FuturaBoldLetters/lower-cases/${key}.png`);
    this.body = Bodies.circle(x, y, r/1.2, options);
  }
  else if(key >= '0' && key <= '9') {
    //console.log(key);
    this.image = loadImage(`FuturaBoldLetters/numbers/${key}.png`);
    this.body = Bodies.circle(x, y, r/1.2, options);
  }
  else {
    //this.image = loadImage(possible_letter_images[floor(random(possible_letter_images.length))]);
  }
  //this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);
  //Matter.Body.scale(this.body, 2, 2);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    //rectMode(RADIUS);
    strokeWeight(1);
    stroke(255);
    fill(255, 102, 0);
    // for some reason, matter.js circle bodies diameter is twice the size of circle diameter of p5.js ???
    //circle(0, 0, this.r*2);
    // image always displays at the right bottom corner of the matter.js body, so need (-10, -10) offset to make it at the center ???
    //console.log(this.image.width);
    image(this.image, -this.r/2, -this.r/2, this.image.width*this.r/15*1.2, this.image.height*this.r/15*1.2);
    pop();
  };
}