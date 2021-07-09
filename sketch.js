
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var backgroundImage;
var survivalTime=0;
var score;
function preload(){
  backgroundImage=loadImage("jungle.jpg");
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(700,450)

  background=createSprite(0,0,700,450);
  background.addImage(backgroundImage);
  background.scale=1.5;
  
  monkey=createSprite(100,400,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.2;
  
  ground = createSprite(100,420,700,20);
  ground.x=ground.width/2;
  ground.visible=false;
  

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

  score = 0;
 
  
}


function draw() {
  
  background.velocityX=-3;
  
    
  if(background.x<0) {
    background.x=background.width/2;
  }
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
     spawnFood();
    spawnObstacles();
 
    if(keyDown("space")&&monkey.y>-250 ) {
      monkey.velocityY = -11;
    }
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2
    }
  
    switch(score){
      case 10:monkey.scale=0.22;
        break;
          case 20:monkey.scale=0.24;
        break;
          case 30:monkey.scale=0.26;
        break;
          case 40:monkey.scale=0.28;
        break;
    }  
   monkey.velocityY=monkey.velocityY+0.8;
   monkey.collide(ground);
       score = score + Math.round((getFrameRate() / 30));
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      
    }
  if (score % 1000 === 0) {
    monkey.scale = monkey.scale + 0.01;
  }
  if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    monkey.scale = 0.13;
    FoodGroup.destroyEach();
  }
  drawSprites();

  


 
}



function spawnFood() {
 
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
   
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
   
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
   
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
   
    obstacle.lifetime = 300;
    
   
    obstaclesGroup.add(obstacle);
  }
}
