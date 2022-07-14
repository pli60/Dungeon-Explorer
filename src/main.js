
function preload(){
  
  tile_water = loadImage('assets/Water.png');
  bg1 = loadImage('assets/Background1.png');
  bg2 = loadImage('assets/Background2.png');
  bg3 = loadImage('assets/Background3.png');
  bg4 = loadImage('assets/Background4.png');
  bg5 = loadImage('assets/Background5.png');
  
}


function setup() {

  createCanvas(canvas_width, canvas_height);
  let backg = [bg1, bg2, bg3, bg4, bg5];
  bg = random(backg);
  background(bg);

  //console.log("width = " + width + "  height = " + height);


  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation

  rectMode(CORNERS);
  dungeon.drawBorders(); // draws the dividing lines

  dungeon.connectRooms(); // draws lines to connect rooms
  dungeon.generateRoom(); // generates and draws the rooms

  //printout room data for debugging
  printRoomData();


  //test image
  // image(tile_water, 0, 0);

}


function draw(){
  //run 60 times per second

  // image(tile_water, 0, 0);
  
}



