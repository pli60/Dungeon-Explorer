
function preload(){
  
  tile_water = loadImage('assets/Water.png');
  

}


function setup() {

  createCanvas(canvas_width, canvas_height);
  background(0);

  //console.log("width = " + width + "  height = " + height);


  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation

  rectMode(CORNERS);
  dungeon.drawBorders(); // draws the dividing lines

  dungeon.connectRooms(); // draws lines to connect rooms
  dungeon.generateRoom(); // generates and draws the rooms

  //printout room data for debugging
  printRoomData();


  //test image
  image(tile_water, 0, 0);

}


function draw(){
  //run 60 times per second

  
}



