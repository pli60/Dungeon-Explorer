
//-------------------------------------------------------------
//----------------------Global Variables-----------------------
var canvas_width = 1280;            // canvas w and h
var canvas_height = 720;

var minSize = canvas_width / 1;     // used to determine the min size of each room 
var maxSplitLevel = 10;             // height of the BSP tree, determine the variety of the rooms

//seeds setup
var seeds = 99;                     // change this once finish the program, right now make it constant for debugging
var seeds_noise = 0;
var seeds_noise_increment = 0.01;

//road setup 
var road_color = [150, 150, 150];    // road rgb
var road_stroke = 50;                // road stroke

//room setup
var room_color = [150, 150, 150];    // road rgb
var room_ID = 0;                     // init room id to 000

//borders
var border_color = [255, 255, 255];  // road rgb


//rooms control
var rooms = new Array();             // create array

//tiles
var tilesize = 32;                    //tile size should be 32  *  32

var tileID_None = 00;
var tileID_Grass = 01;
var tileID_Water = 02;
var tileID_Road = 03;

//----------------------Global End-----------------------------
//-------------------------------------------------------------



//----------------------Objects--------------------------------
//-------------------------------------------------------------

//object that contains the information of each tile
/*    tile_row, tile_column are the position of the tiles
      layer is the complexity of the tile, pass tileID (can be found in init.js->global->tiles)
      layer 0 is default tile type 
*/
function array_addTile(tile_row, tile_column, layer_0, layer_1, layer_2) {
  this.tile_row = tile_row;
  this.tile_column = tile_column;
  this.layer_0 = layer_0;
  this.layer_1 = layer_1;
  this.layer_2 = layer_2;
}

//object that contains the information of each room, for quick draw
/*    room_ID is reserved but not used, set to 0 by default
      start_x, start_y are the starting point of 
      room_width, room_height are the dimension of the room
*/
function array_addRoom(room_ID, start_x, start_y, room_width, room_height) {
  this.room_ID = room_ID;
  this.start_x = start_x;
  this.start_y = start_y;
  this.room_width = room_width;
  this.room_height = room_height;
  this.tiles_row = room_width / tilesize;
  this.tiles_column = room_height / tilesize;

  this.tiles = new Array();
}





//----------------------Objects End----------------------------
//-------------------------------------------------------------