
//-------------------------------------------------------------
//----------------------Global Variables-----------------------
var canvas_width = 1280;            // canvas w and h
var canvas_height = 720;

var minSize = canvas_width / 2;     // used to determine the min size of each room 
var maxSplitLevel = 10;             // height of the BSP tree, determine the variety of the rooms

//road setup 
var road_color = [150, 150, 150];    // road rgb
var road_stroke = 50;                // road stroke

//room setup
var room_color = [150, 150, 150];    // road rgb

//borders
var border_color = [255, 255, 255];  // road rgb

//rooms control
var rooms = new Array();             // create array

//----------------------Global End-----------------------------
//-------------------------------------------------------------



//----------------------Objects--------------------------------
//-------------------------------------------------------------

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
}
//----------------------Objects End----------------------------
//-------------------------------------------------------------