
function preload() {

  Tile_preload();
  Background_preload();


}


function setup() {

  //randomSeed(seeds);
  var splitLevel = random (1,4);

  var minSize = canvas_width / splitLevel;      // used to determine the min size of each room 

  createCanvas(canvas_width, canvas_height);

  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation

  rectMode(CORNERS);

  dungeon.generateRoom(); // generates and draws the rooms
  Background_setup();
  
  //debugging
  //printRoomData();
  //printRoomTileData();

  randomSeed(seeds);
  Tile_generator();
  //seeds_noise = 0;


  dungeon.connectRooms(); // draws lines to connect rooms






}


function draw() {

  fill(255, 255, 255);
  rect(18, 20, 320, 80, 20);
  fill(0, 0, 0);
  textSize(20);
  text('Click ground to add slimes', 20, 50);
  text('Refresh page to get different seeds', 20, 90);



}



