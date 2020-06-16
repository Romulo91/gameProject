class Box {
    constructor(x, y, w, h){
        const options = {
            restitution: 1
          }
    this.body = Matter.Bodies.rectangle(x,y, w, h, options);
    Matter.World.add(world, this.body);
    this.w = w; 
    this.h = h;
    this.outOfCanvas = false;
    
}
show (){
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(0);
    rectMode(CENTER);
    imageMode(CENTER);
    image(boxingImg ,0, 0, this.w, this.h);
    pop();
    // console.log(this.x, "box", this.body.position);
    // console.log(this.body.position.x, width);

}
}