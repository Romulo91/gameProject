// console.log("hello main.js");
let img; 
let ground; 
let box; 
let bird; 

function preload(){
    img = loadImage("/assets/sky.jpeg");
    // playerImg = loadImage("")

}

function setup(){
    createCanvas(1000, 500);  // create the canvas in the main JS
    ground = new Box(0, height-20, width, 20);
    box = new Box(750, 400,50, 75);
    bird = new Bird(70, 400, 40);
}

function draw(){
    background(img);
    ground.show();
    box.show();
    bird.show();

}