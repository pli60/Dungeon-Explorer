
//-------------------------------------------------------------
//----------------------Global Variables-----------------------
var canvas_width = 2560;            // canvas w and h
var canvas_height = 1440;

var minSize = canvas_width / 4;     // used to determine the min size of each room 
var maxSplitLevel = 20;             // height of the BSP tree, determine the variety of the rooms

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
var rooms = [];                       // create array

//tiles
var tilesize = 32;                    //tile size should be 32  *  32


var tileID_None = 000;
var tileID_Grass = 001;
var tileID_Water = 002;
var tileID_Road = 003;

//add tileID_     = 04 / 05   different layer 0 type 
//                  011/012   add layer 1 to layer 0



//----------------------Global End-----------------------------
//-------------------------------------------------------------

