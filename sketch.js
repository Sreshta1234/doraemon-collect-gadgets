var doraemon, doraemonImg;
var road, roadImg;
var bamboocopter, dressupcamera, gullivertunnel, bomb;
var anywheredoorImg, bamboocopterImg, dressupcameraImg, gullivertunnelImg, bombImg;
var score = 0;
var endImg;
var collectSound, collideSound;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
    
    collectSound = loadSound("collect.wav");
    collideSound = loadSound("collide.wav");

    doraemonImg = loadAnimation("doraemon1.png", "doraemon2.png", "doraemon3.png");
    endImg =loadAnimation("gameOver.png");
 
    roadImg = loadImage("road.png");
    bamboocopterImg = loadImage("Bamboo copter.png");
    dressupcameraImg = loadImage("Dress up camera.png");
    gullivertunnelImg = loadImage("Gulliver tunnel.png");
    bombImg = loadImage("Bomb.png");
}

function setup() {
  createCanvas(800, 300);

    road = createSprite(100, 150);
    road.addImage(roadImg);
    road.velocityX = -5;

    doraemon = createSprite(50, 250);
    doraemon.addAnimation("doraemon_running", doraemonImg);
    doraemon.scale = 0.3;

    bamboocopterG = new Group();
    dressupcameraG = new Group();
    gullivertunnelG = new Group();
    bombG = new Group();

}

function draw() {
   background(200);

   if(gameState == PLAY){
     doraemon.y = World.mouseY;

     edges= createEdgeSprites();
     doraemon.collide(edges);

     if(road.x < 0){
      road.x = width/2;
     }
     
   }

   createBambooCopters();
   createDressUpCamera();
   createGulliverTunnel();
   createBomb();

     if (bamboocopterG.isTouching(doraemon)) {
      collectSound.play();
      bamboocopterG.destroyEach();
      score=score+50;
    }

    else if (dressupcameraG.isTouching(doraemon)) {
      collectSound.play();
      dressupcameraG.destroyEach();
      score=score+100;
    }

    else if(gullivertunnelG.isTouching(doraemon)) {
      collectSound.play();
      gullivertunnelG.destroyEach();
      score=score+150;
    }

    else{
      if(bombG.isTouching(doraemon)) {

        collideSound.play();

        gameState=END;

        doraemon.addAnimation("doraemon_running",endImg);

        doraemon.x=400;
        doraemon.y=150;
        doraemon.scale=0.6;

        road.velocityX = 0;
        road.lifetime = -3;
      }

      if(gameState == END){
        bamboocopterG.destroyEach();
        dressupcameraG.destroyEach();
        gullivertunnelG.destroyEach();
        bombG.destroyEach();

        bamboocopterG.setVelocityXEach(0);
        dressupcameraG.setVelocityXEach(0);
        gullivertunnelG.setVelocityXEach(0);
        bombG.setVelocityYEach(0);
      }
    }

   drawSprites();
   textSize(20);
   fill(255);
   text("Score: "+ score, 680, 30);
   }

function createBambooCopters(){
  if(World.frameCount % 240 == 0){  
    bamboocopter = createSprite(800, Math.round(random(50, 250)));
    bamboocopter.addImage(bamboocopterImg);
    bamboocopter.scale = 0.05;
    bamboocopter.velocityX = -3;
    bamboocopter.lifetime = 400;
    bamboocopterG.add(bamboocopter);
  }
}

function createDressUpCamera() {
  if (World.frameCount % 310 == 0) {
  var dressupcamera = createSprite(800, Math.round(random(50, 250)));
  dressupcamera.addImage(dressupcameraImg);
  dressupcamera.scale=0.15;
  dressupcamera.velocityX = -3;
  dressupcamera.lifetime = 400;
  dressupcameraG.add(dressupcamera);
  }
}

function createGulliverTunnel() {
  if (World.frameCount % 405 == 0) {
  var gullivertunnel= createSprite(800, Math.round(random(50, 250)));
  gullivertunnel.addImage(gullivertunnelImg);
  gullivertunnel.scale=0.05;
  gullivertunnel.velocityX = -3;
  gullivertunnel.lifetime = 400;
  gullivertunnelG.add(gullivertunnel);
  }
}

function createBomb() {
  if (World.frameCount % 510 == 0) {
  var bomb= createSprite(800, Math.round(random(50, 250)));
  bomb.addImage(bombImg);
  bomb.scale=0.075;
  bomb.velocityX = -3;
  bomb.lifetime = 400;
  bombG.add(bomb);
  }
}