const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

// console.log("hello main.js");
let imgBackground; 
let dotImg; 
let boxingImg;
let countScore = 0; 
let birdCount = 0; 
let level_1; 
let level_2; 

let ground; 
const boxes = []; 
let bird; 
let world,engine; 
let mContraint;
let slingshot; 
let score = document.querySelector("#counter");
function preload(){
  imgBackgroundg = loadImage("/assets/backgroundSky.jpeg");
  dotImg = loadImage("/assets/Angry_Bird.png")
  boxingImg = loadImage("/assets/tnt.png");
}

// level = 1;
// birdcount = 0; 
// if birdcount >= 3 && countScore < 3 = beginn new level 1 

function setup(){
  const canvas = createCanvas(1435, 500);  // create the canvas in the main JS
  engine = Engine.create();
  engine = Matter.Engine.create();
  world = engine.world;
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



function draw(){
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
        console.log("here!!!!!!!!!!!!!", countScore, box);
      }
    }
  })
   // go to next Level...
   //  if (birdCount >= 3) return level_1 === true
   //  return level_2
   //  console.log(level_1)

  document.querySelector("#counter").innerHTML = countScore;
  
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingshot.attach(bird.body);
    birdCount +=  1
    console.log(birdCount);
  }


}