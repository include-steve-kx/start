function Border(angle = 0, h = 100, x = windowWidth/2, y = height, w = windowWidth*2, settings="default") {
  var options = {
    isStatic: true
  };
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
  //Matter.Body.rotate(this.body, this.angle);
  Matter.Body.rotate(this.body, angle);
  World.add(world, this.body);
  //Matter.Body.scale(this.body, 2, 2);

  this.rotate_border = function() {
    Matter.Body.rotate(this.body, radians(frameCount));
  };

  this.show = function() {
    // use p5.js to visualize the ground
    noStroke(255);
    fill(255, 102, 0);
    rectMode(CENTER);
    translate(this.x, this.y);
    //rotate(this.angle);
    //rotate(radians(frameCount));
    rect(0, 0, this.w, this.h);
  };
}

//module.exports.Border = Border;