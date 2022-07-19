
function preload() {

  Tile_preload();
  Background_preload();


}


function setup() {

  randomSeed(seeds);

  createCanvas(canvas_width, canvas_height);




  Background_setup();

  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation

  rectMode(CORNERS);
  //dungeon.drawBorders(); // draws the dividing lines
  //dungeon.connectRooms(); // draws lines to connect rooms
  dungeon.generateRoom(); // generates and draws the rooms
  Tile_generator();
  //debugging
  //printRoomData();
  //printRoomTileData();





}


function draw() {
  //run 60 times per second

  // image(tile_water, 0, 0);

}



