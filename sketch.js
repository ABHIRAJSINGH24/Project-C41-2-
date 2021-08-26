//Create variables here
var dog;//happyDog;
var dogImage,happyDogImage;

var database;

var foodS, foodStock;

var fedTime,lastFed;

var foodObj;

var feedDogButton,addFoodButton,bathButton,sleepButton,playButton,playinparkButton;

var gameState,gameStateRef,gameStateUpdate;

var bedroomImage,gardenImage,washroomImage,milkBottleImage;

var milkBottle1,milkBottle2;

function preload()
{
	//load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
  milkBottleImage = loadImage("images/Milk.png");
  bedroomImage = loadImage("virtual pet images/Bed Room.png");
  gardenImage = loadImage("virtual pet images/Garden.png");
  washroomImage = loadImage("virtual pet images/Wash Room.png");
  livingRoomImage = loadImage("virtual pet images/Living Room.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

//  foodStock = database.ref("Food");
//  foodStock.on("value",readStock);

//  fedTime = database.ref("FeedTime");
//  fedTime.on("value",function(data){
//  lastFed = data.val();
//});
  
  database.ref("/").update({
    gameState:"AddingFood"
  })

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  foodObj = new food();
  foodObj.getFoodStock();
  foodObj.updateFoodStock(20);

  feedDogButton = createButton("Feed the dog");
  feedDogButton.position(400,75);
  feedDogButton.mousePressed(feedDog);

  addFoodButton = createButton("Add food for the dog");
  addFoodButton.position(500,75);
  addFoodButton.mousePressed(addFood);

  bathButton = createButton("I wish to take a bath");
  bathButton.position(650,75);
  bathButton.mousePressed(takeBath);

  sleepButton = createButton("I wish to sleep");
  sleepButton.position(525,125);
  sleepButton.mousePressed(sleep);

  playButton = createButton("Let us play");
  playButton.position(425,125);
  playButton.mousePressed(play);

  playinparkButton = createButton("Let us play in the park");
  playinparkButton.position(650,125);
  playinparkButton.mousePressed(playinpark)

  gameStateRef = database.ref("gameState");
  gameStateRef.on("value",function(data){
    gameState = data.val();
  });

  milkBottle1 = createSprite(200,300,20,20);
  milkBottle1.addImage(milkBottleImage);
  milkBottle1.scale = 0.04;

  milkBottle2 = createSprite(130,470,20,20);
  milkBottle2.addImage(milkBottleImage);
  milkBottle2.scale = 0.04;
}


function draw() {
  background(46, 139, 87);

  foodObj.display();
  console.log(gameState);

  if(gameState==="Hungry"){
    milkBottle1.x = 190;
    milkBottle1.y = 350;
    dog.x = 250;
    dog.y = 300;
  }else{
    milkBottle1.x = 200;
    milkBottle1.y = 300;
  }

  fill("blue");
  textSize(20);
  text("Milk Bottles Remaining:"+foodObj.foodStock,150,475);

//  if(gameState==="Hungry"){
//    feedDogButton.show()
//    addFoodButton.show()
//    dog.visible = true
//  }else if(gameState!=="Hungry"){
//    feedDogButton.hide()
//    addFoodButton.hide()
//    dog.visible = false
//  }

//  currentTime = hour();
//  if(currentTime===(lastFed+1)){
//     update("Playing")
//     foodObj.garden()
//  }else if(currentTime===(lastFed+2)){
//    update("Sleeping")
//    foodObj.bedroom()
//  }else if(currentTime>(lastFed+2) && currentTime<(lastFed+4)){
//    update("Bathing")
//    foodObj.washroom()
//  }else{
//    update("Hungry")
//    foodObj.display();
//  }
  
  //if(keyCode===UP_ARROW){
  //  writeStock(foodS);
  //  dog.addImage(happyDogImage);
  //}
  //textSize(25);
  //fill("blue");
  //stroke("blue");
  //text("Press UP arrow to feed the dog milk",60,150)
  //text("Food Remaining:"+foodS,140,200);

  drawSprites();
  //add styles here
}

//function readStock(data){
//  foodS = data.val();
//}

//function writeStock(x){
//  database.ref("/").update({
//    foodS:x
//  });
//}

function addFood(){
  if(foodObj.foodStock<20){
    foodObj.foodStock = foodObj.foodStock+1;
  }
  database.ref("/").update({
      Food:foodObj.foodStock
    })
  database.ref("/").update({
    gameState:"AddingFood"
  })
  if(gameState==="AddingFood"){
    dog.addImage(dogImage);
    dog.scale = 0.2;
    dog.x = 250;
    dog.y = 300;
    milkBottle1.visible = true;
  }  
}

function feedDog(){
  database.ref("/").update({
    gameState:"Hungry"
  });
  if(foodObj.foodStock>0 && gameState==="Hungry"){
    dog.addImage(happyDogImage);
    dog.scale = 0.2;
    milkBottle1.visible = true;
    foodObj.updateFoodStock(foodObj.foodStock); 
    foodObj.deductFood();
//    database.ref("/").update({
//      FeedTime:hour()
//    })
  }
}

function takeBath(){
  database.ref("/").update({
    gameState:"Washroom"
  })
  if(gameState==="Washroom"){
    dog.addImage(washroomImage);
    dog.scale = 0.85;
    dog.x = 250;
    dog.y = 100;
    milkBottle1.visible = false;
  } 
}

function sleep(){
  database.ref("/").update({
    gameState:"Sleeping"
  })
  if(gameState==="Sleeping"){
    dog.addImage(bedroomImage);
    dog.scale = 0.85;
    dog.x = 250;
    dog.y = 100;
    milkBottle1.visible = false;
  }
}

function play(){
  database.ref("/").update({
    gameState:"Playing"
  })
  if(gameState==="Playing"){
    dog.addImage(livingRoomImage);
    dog.scale = 0.85;
    dog.x = 250;
    dog.y = 100;
    milkBottle1.visible = false;
  }
}

function playinpark(){
  database.ref("/").update({
    gameState:"Playinginpark"
  })
  if(gameState==="Playinginpark"){
    dog.addImage(gardenImage);
    dog.scale = 0.85;
    dog.x = 250;
    dog.y = 100;
    milkBottle1.visible = false; 
  }
}