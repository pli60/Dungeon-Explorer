
function preload() {

  Tile_preload();
  Background_preload();


}


function setup() {

  //randomSeed(seeds);
  createCanvas(canvas_width, canvas_height);


  //rectMode(CORNERS);




  randomSeed(seeds);

  var splitLevel = random (1,4);
  var minSize = canvas_width / splitLevel;      // used to determine the min size of each room 
  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation
  dungeon.generateRoom(); // generates and draws the rooms

  Background_setup();
  Tile_generator();



}


function draw() {



  draw_map();

  //dungeon.connectRooms(); // draws lines to connect rooms



  draw_text();
  reset_init();



}



function draw_text(){

  fill(255, 255, 255);
  rect(18, 20, 320, 80, 20);
  fill(0, 0, 0);
  textSize(20);
  text('Click ground to add slimes', 20, 50);
  text('Refresh page to get different seeds', 20, 90);
}

function reset_init(){
  // room_canvas = [];
  // rooms = [];
  //seeds_noise = 0;
}

function draw_map(){

  // image(tile_water, column * tilesize, row * tilesize);
  // room_canvas[0].tiles[row][column] = new array_addTile(row, column, tileID_Water, tileID_None, tileID_None);

  for (var row = 0; row < canvas_height / tilesize; row++) {
    for (var column = 0; column < canvas_width / tilesize; column++) {

      //image(tile_turtle, column * tilesize, row * tilesize);

      image(tile_waterBC, column * tilesize, row * tilesize);


      if(room_canvas[0].tiles[row][column].layer_0 == tileID_Water){
        if(room_canvas[0].tiles[row][column].layer_1 == tileID_turtle){
          image(tile_turtle, column * tilesize, row * tilesize);
        }else{
          image(tile_water, column * tilesize, row * tilesize);
        }
      }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_Bridge){

      }

      





    }

}
  
}
