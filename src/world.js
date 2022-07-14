
//-------------------------------------------------------------
//----------------------Global Variables-----------------------
var canvas_width = 1280;            // canvas w and h
var canvas_height = 720;

var minSize = canvas_width / 1;     // used to determine the min size of each room 
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




//----------------------Helper Function------------------------











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

  

}


function draw(){
  //run 60 times per second
  
}

//function 
//  print out data for debugging
function printRoomData() {
  for (var i = 0; i < rooms.length; i++) {

    console.log("ID : " + rooms[i].room_ID);
    console.log("start_x : " + rooms[i].start_x);
    console.log("start_y : " + rooms[i].start_y);
    console.log("room_width : " + rooms[i].room_width);
    console.log("room_height : " + rooms[i].room_height);
    console.log("");
  }

}



function generateDungeon(maxSplitLevel, minRoomSize) {
  // sets starting conditions and calls respective functions for dungeon creation
  var startPoint = {
    x: 0,
    y: 0
  };
  var endPoint = {
    x: width,
    y: height
  };

  //root (parent)  - child  
  var dungeon = new BSPNode(null, startPoint, endPoint); // initialize dungeon

  dungeon.splitAll(minRoomSize, maxSplitLevel, 0); // start spliting process

  return dungeon;
}

//function
//  constructor of BSPNode, used to build the root of the BSP tree
function BSPNode(parentNode, startPoint, endPoint) {
  this.parentNode = parentNode;
  this.startPoint = startPoint;
  this.endPoint = endPoint;
  this.level = 0;
  this.leftNode = null;
  this.rightNode = null;
  var centerX = this.startPoint.x + (this.endPoint.x - this.startPoint.x) / 2;
  var centerY = this.startPoint.y + (this.endPoint.y - this.startPoint.y) / 2;

  this.centerPoint = {
    x: centerX,
    y: centerY
  };

  //testing code to print out the center of each node
  //print("center: " + this.centerPoint.x.toFixed() + ", " + this.centerPoint.y.toFixed());
}


//function
//  used to make road between every nodes and there parents
BSPNode.prototype.connectRooms = function () {

  if (this.rightNode) {
    this.rightNode.connectRooms();
  }
  if (this.leftNode) {
    this.leftNode.connectRooms();
  }

  stroke(road_color);
  strokeWeight(road_stroke);

  if (this.parentNode) {
    //this part need to change to tile if we want to make tilemap
    line(this.parentNode.leftNode.centerPoint.x,
      this.parentNode.leftNode.centerPoint.y,
      this.parentNode.rightNode.centerPoint.x,
      this.parentNode.rightNode.centerPoint.y);
  }
}


BSPNode.prototype.generateRoom = function () {
  // generate rooms in the leaves of the BSP tree
  if (this.leftNode && this.rightNode) {
    // this nodes is not a leave
    this.rightNode.generateRoom();
    this.leftNode.generateRoom();
  } else {
    // this node is a leave, thus create a room
    //print("level: " + this.level);
    var dx = this.endPoint.x - this.startPoint.x;
    var dy = this.endPoint.y - this.startPoint.y;
    //print("dx, dy: " + dx.toFixed() + ", " + dy.toFixed());
    var roomW = dx - random(dx / 8, dx / 2); // arbitrary      dx * 1/2   to   dx * 7/8    
    var roomH = dy - random(dy / 8, dy / 2); // arbitrary      same here




    var x = random(this.startPoint.x, this.endPoint.x - roomW);
    var y = random(this.startPoint.y, this.endPoint.y - roomH);

    //console.log("dx " + dx + " dy " + dy);
    //console.log("roomW " + roomW + " roomH " + roomH);
    //console.log("x " + x + " y " + y);


    //add data into rooms array
    rooms.push(new array_addRoom(0, x, y, roomW, roomH));


    rectMode(CORNER);
    noStroke();
    fill(room_color);
    rect(x, y, roomW, roomH);


    ellipseMode(CORNER);
    fill("red");
    ellipse(x + roomW / 4, y + roomH / 4, roomW / 2, roomH / 2);

    // image(water, x, y, 32, 32);

    // save room specs (not yet used for anything :P)
    this.roomX = x;
    this.roomY = y;
    this.roomW = roomW;
    this.roomH = roomH;
  }
}

//function
//  draw border between every rooms
BSPNode.prototype.drawBorders = function () {
  // draws the borders between nodes
  noFill();
  stroke(border_color);
  strokeWeight(2);
  rect(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);

  // recursively call for other nodes
  if (this.leftNode) {
    this.leftNode.drawBorders();
  }
  if (this.rightNode) {
    this.rightNode.drawBorders();
  }
}



//helper function used in room generation
BSPNode.prototype.splitAll = function (minRoomSize, maxSplitLevel, level) {
  // recursively splits the nodes if conditions are met
  this.level = level;
  //print("START: x: " + this.startPoint.x.toFixed() + ", y: " + this.startPoint.y.toFixed() + " END: x: " + this.endPoint.x.toFixed() + ", y: " + this.endPoint.y.toFixed());
  var splitting = this.splitable(minRoomSize);
  if (splitting !== 0) { // 0 means no split
    level++;
    // choose random split point; minRoomsize/2 is arbitrary
    var splitX = random(this.startPoint.x + minRoomSize / 2,
      this.endPoint.x - minRoomSize / 2);
    var splitY = random(this.startPoint.y + minRoomSize / 2,
      this.endPoint.y - minRoomSize / 2);
    var p = {
      x: splitX,
      y: splitY
    };

    if (splitting === 1) { // horizontal
      this.splitUp(p, 0);
    } else if (splitting === 2) { // vertical
      this.splitUp(p, 1);
    }

    // recursive call if level is low enough
    if (level < maxSplitLevel) {
      this.leftNode.splitAll(minRoomSize, maxSplitLevel, level);
      this.rightNode.splitAll(minRoomSize, maxSplitLevel, level);
    }

  }
}


//helper function used in split
BSPNode.prototype.splitUp = function (splitPoint, axis) {
  // splits node at splitPoint along the given axis
  if (splitPoint.x < this.startPoint.x || splitPoint.x > this.endPoint.x) {
    print("failure: splitting-point not inside this node");
  } else if (splitPoint.y < this.startPoint.y || splitPoint.y > this.endPoint.y) {
    print("failure: splitting-point not inside this node");
  } else {

    var leftStart, leftEnd, rightStart, rightEnd;

    switch (axis) {
      case 0: // horizontal
        leftStart = this.startPoint;
        leftEnd = {
          x: this.endPoint.x,
          y: splitPoint.y
        };
        rightStart = {
          x: this.startPoint.x,
          y: splitPoint.y
        };
        rightEnd = this.endPoint;
        break;

      case 1: // vertical
        leftStart = this.startPoint;
        leftEnd = {
          x: splitPoint.x,
          y: this.endPoint.y
        };
        rightStart = {
          x: splitPoint.x,
          y: this.startPoint.y
        };
        rightEnd = this.endPoint;
        break;

      default:
        print("failure: axis must be 0 (horizontal) or 1 (vertical)");
    }

    // create new nodes along the border
    this.leftNode = new BSPNode(this, leftStart, leftEnd);
    this.rightNode = new BSPNode(this, rightStart, rightEnd);

  }
}

//helper function used in split
BSPNode.prototype.splitable = function (minRoomSize) {
  // 0 -> no splitting, 1 -> horizontal, 2 -> vertical, 3 -> both
  if (this.leftNode || this.rightNode) { // already split nodes are ignored
    return 0;
  }
  var dx = this.endPoint.x - this.startPoint.x;
  var dy = this.endPoint.y - this.startPoint.y;
  //print("dx: " + dx.toFixed() + ", dy: " + dy.toFixed());

  if (dx < minRoomSize) {
    if (dy < minRoomSize) {
      return 0; // no split
    } else {
      return 1; // horizontal
    }
  } else {
    if (dy < minRoomSize) {
      return 2; // vertical
    } else {
      var coin = random(1); // "coin toss" to decide which split-direction
      if (coin <= 0.5) { // horizontal
        return 1;
      } else { // vertical
        return 2;
      }
    }
  }
}