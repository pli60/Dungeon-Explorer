
function preload() {

  Tile_preload();
  Background_preload();


}


function setup() {

  //randomSeed(seeds);

  createCanvas(canvas_width, canvas_height);


  var splitLevel = random (1,4);
  var minSize = canvas_width / splitLevel;      // used to determine the min size of each room 
  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation
  dungeon.generateRoom(); // generates and draws the rooms

  Background_setup();
  Tile_generator();
  dungeon.connectRooms(); // draws lines to connect rooms


}


function draw() {



  draw_map();
  draw_text();
  reset_init();


}


function reset_init(){
  // room_canvas = [];
  // rooms = [];
  //seeds_noise = 0;
}
