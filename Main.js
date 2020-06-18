const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

// test
// images
let imgBackground; 
let dotImg; 
let boxingImg;

// count and level 
let countScore = 0; 
let birdCount = 0; 


// LEVEL
let level = 0;

// new Part.
var particles = [];
// !!!!!!!!!!

let ground; 
const boxes = []; 
let bird; 
let world,engine; 
let mContraint;
let slingshot; 

let score = document.querySelector("#counter");
function preload(){
  imgBackgroundg = loadImage("./assets/backgroundSky.jpeg");
  imgLevel2 = loadImage("./assets/background2.jpg");
  dotImg = loadImage("./assets/Angry_Bird.png");
  boxingImg = loadImage("./assets/tnt.png");
  // imgStart = loadImage("/assets/startAngryBird.png");
  imgOver = loadImage("./assets/gameover.jpg");
}


function setup(){
  const canvas = createCanvas(1435, 500);  // create the canvas in the main JS
  engine = Engine.create();
  engine = Matter.Engine.create();
  world = engine.world;
// engine -> run 


// new Particle! !!!!!!!
var prev = null;
for (var x = 200; x < 300; x += 20) {

  var fixed = false;
  if (!prev) {
    fixed = true;
  }
  var p = new Particle( 900, 50, 18, fixed);
  // var p2 = new Particle(200, 150, 10);
  particles.push(p);

  if (prev) {
    var optionsLevel2 = {
      bodyA: p.body,
      bodyB: prev.body,
      length: 40,
      stiffness: 0.4
    }
    var constraint = Constraint.create(optionsLevel2);
    World.add(world, constraint);
  }

  prev = p;
}
// !!!!!!!!!!!!!



  ground = new Ground(width/2, height - 5, width, 20);
  
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box( 1200,300 -i*75, 60, 80);
    // position ar tzhe same or not 
    console.log(boxes[i].body.position.x, width);
    
    
  }
  
  console.log(document.querySelector("#counter"));
  bird = new Bird(200, 400, 40);
  slingshot = new SlingShot(200, 400, bird.body);
  
  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}



function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}


// Draw - Function 

function draw(){
 
  
  if (level == 0){
  
  console.log("this is Level 0"); 
  document.getElementById("countScore").style.display="none";
  //background(imgStart);
  //  document.querySelector("#imgStarter").innerHTML = imgStart; 
   textSize(20);
   textAlign(CENTER);
   fill(51);
   textSize(32);
   text('Press ENTER to Start', 970, 300);
   
   if(keyCode === 13){
     level = 1;
    
   }

  }


  if(birdCount >= 3 ) {
    background(imgOver);
    console.log("Game Over"); 
    
    if(keyCode === 13){
      birdCount = 0;
      level = 1;
    }
  } else if(level == 1) {
    console.log("Level_1");
    document.getElementById("countScore").style.display="";
      document.getElementById("imgStarter").style.display="none";
    if(birdCount <=3 && countScore == 3) {
      countScore = 0;
      level= 2;
      birdCount = 0;
    }
  background(imgBackgroundg);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes){
  box.show();
  }

  slingshot.show();
  bird.show();

  boxes.forEach(function(box) {
    if (box.body.position.x > width) {
      if(box.outOfCanvas == false) {
        box.outOfCanvas=true;

        countScore += 1
      }
    }
  })

  document.querySelector("#counter").innerHTML = countScore;
   
  }

  if(level == 2) {

    // draw second level here
   background(imgLevel2);
   Matter.Engine.update(engine);
   ground.show();
   for (let box of boxes){
   box.show();  
   console.log("level 2")
   slingshot.show();
  bird.show();

  }

  document.querySelector("#counter").innerHTML = countScore;
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }
}

}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingshot.attach(bird.body);
    birdCount +=  1
    console.log("pressing space");
  }

} 
