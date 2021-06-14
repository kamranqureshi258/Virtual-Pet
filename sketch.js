var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var db;
var height;


function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);

  db=firebase.database();
  var dbref=db.ref("ballon/height");
  dbref.on("value",readposition,showError);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function updateHeight(x,y){
  db.ref('ballon/height').set(
    {
      'x':height.x+x,
      'y':height.y+y
    }
  )
}

function readHeight(data){
  height=data.val()
  balloon.x=height.x;
  balloon.y=height.y;
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10,0)    
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10,0) 
  }

  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updateHeight(0,10)  
    balloon.scale=balloon.scale+0.01; 
  }

  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation("hot Air Ballon",balloonImage2);
    balloon.scale=balloon.scale -0.01;
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function readposition(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}
function showError(){
  console.log("show error");
}