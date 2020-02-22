// constructor function
function Drawing(thecanvas){
// property
this.canvas=thecanvas;
this.cc=["red","blue","green","yellow","purple","pink"];
// methods
this.rectangle=rectangle;
// random number method
this.rnos=rnos;
}

// method functions

function rectangle(x,y,width,height,lw,fillcol,strcol){
var canvas = document.getElementById(this.canvas);
var context = canvas.getContext('2d');

context.beginPath();
context.rect(x,y,width,height);
context.fillStyle = fillcol;
context.fill();
context.lineWidth = lw;
context.strokeStyle =strcol;
context.stroke();

}

function rnos(min,max){
var r;
r=Math.floor(Math.random()*(max-min+1))+min;
return r;


}


// instance of the object
var test=new Drawing("diagram");


function setup(){

test.rectangle(50,50,100,50,5,"orange","green");



}

function forbutton(){
var x;
var y;
var w;
var h;
var c1;
var c2;
x=test.rnos(0,500);
y=test.rnos(0,500);
w=test.rnos(30,100);
h=test.rnos(30,100);

c1=test.rnos(0,5);
c2=test.rnos(0,5);


test.rectangle(x,y,w,h,5,test.cc[c1],test.cc[c2]);
}
