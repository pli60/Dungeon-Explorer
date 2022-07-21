
function preload() {
  all_preload()
}


function setup() {

  //randomSeed(seeds);

  createCanvas(canvas_width, canvas_height);


  var splitLevel = random(1, 4);
  var minSize = canvas_width / splitLevel;      // used to determine the min size of each room 
  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation
  dungeon.generateRoom(); // generates and draws the rooms

  Background_setup();
  Tile_generator();
  dungeon.connectRooms(); // draws lines to connect rooms
  seagull_setup();


}


function draw() {

  draw_map();
  draw_text();


  for (var i = 0; i < seagulls.length; i++) {
    seagulls[i].makeitMove();
  }

}
