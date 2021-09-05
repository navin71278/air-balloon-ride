var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();
  // database=firebase();
  // database=database();
  // database=firebase.db();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;

  // var balloonHeight=database.ref('balloon/height');
  // balloonHeight.on("value", showError);

  // var balloonHeight=database.ref('balloon/height');
  // balloonHeight.on("value",readHeight);

  // var balloonHeight=database.ref('balloon/height');
  // balloonHeight.on(readHeight, showError);

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-2;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+2;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-2;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+2;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

//CHOOSE THE CORRECT UPDATEHEIGHT FUNCTION
// function updateHeight(x,y){
//   database.ref('balloon/height').set({
//     'x': height.x ,
//     'y': height.y 
//   })
// }

// function updateHeight(x,y){
//   database.ref('balloon/height')({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}


// function updateHeight(x,y){
//   database.ref().set({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }




//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}
