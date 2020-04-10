// function Box(x, y, w, h) {
//   var options = {
//     friction: 0.3,
//     restitution: 0.6
//   };
//   this.body = Bodies.rectangle(x, y, w, h, options);
//   this.w = w;
//   this.h = h;
//   World.add(world, this.body);
//   scale(this.body, random(100), random(100));

//   this.show = function() {
//     var pos = this.body.position;
//     var angle = this.body.angle;
//     push();
//     translate(pos.x, pos.y);
//     rotate(angle);
//     rectMode(CENTER);
//     strokeWeight(1);
//     stroke(255);
//     fill(170, 62, 3);
//     console.log("iofjdsoifjaso");
//     rect(0, 0, this.w, this.h);
//     pop();
//   };
// }

// class Box{
//   constructor(x, y, w, h) {
//     this.options = {
//       friction: 0.3,
//       restitution: 0.6
//     };
//     this.w = w;
//     this.h = h;
//     this.body = Bodies.rectangle(x, y, w, h, options);
//   }
  

//   show() {
//     var pos = this.body.position;
//     var angle = this.body.angle;
//     push();
//     translate(pos.x, pos.y);
//     rotate(angle);
//     rectMode(CENTER);
//     strokeWeight(1);
//     stroke(255);
//     fill(127);
//     rect(0, 0, this.w, this.h);
//     pop();
//   }
// }