
//-------------------------------------------------------------
//----------------------Global Variables-----------------------
var canvas_width = 1280 * 2;            // canvas w and h
var canvas_height = 768 * 2;
// var minSize = canvas_width / 3;      // used to determine the min size of each room 
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
var room_canvas = [];                 // room of entire canvas, accessable for all purpose
//warning don't call room in any other function expect the tile_generator
var rooms = [];                       // create array


//tiles
var tilesize = 32;                    //tile size should be 32  *  32


var tileID_None = 000;
var tileID_Grass = 001;
var tileID_Water = 002;
var tileID_Bridge = 003;

var tileID_Flower = 011;
var tileID_Rock = 012;
var tileID_frog = 013;
var tileID_turtle = 014;
var tileID_turtle2 = 0141;

var tileID_greenSlime = 015;
var tileID_redSlime = 0151;



var tileID_overlap_top = 201;
var tileID_overlap_down = 202;
var tileID_overlap_right = 203;
var tileID_overlap_left = 204;


var tileID_overlap_topLeft = 211;
var tileID_overlap_topRight = 212;
var tileID_overlap_downLeft = 213;
var tileID_overlap_downRight = 214;


var tileID_island_top = 221;
var tileID_island_down = 222;
var tileID_island_left = 223;
var tileID_island_right = 224;



var tileID_island_conj_top = 231;
var tileID_island_conj_down = 232;
var tileID_island_conj_left = 233;
var tileID_island_conj_right = 234;


var tileID_cross_leftRight = 240;
var tileID_cross_topBot = 241;


//add tileID_     = 04 / 05   different layer 0 type 
//                  011/012   add layer 1 to layer 0



//----------------------Global End-----------------------------
//-------------------------------------------------------------

