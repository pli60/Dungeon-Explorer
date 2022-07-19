//don't need to code here
//all elements should be able to access from out side
//use rooms array to get coordinator


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

  // stroke(road_color);
  // strokeWeight(road_stroke);

  if (this.parentNode) {

    var draw_startColumn = parseInt(this.parentNode.leftNode.centerPoint.x/32);
    var draw_startRow = parseInt(this.parentNode.leftNode.centerPoint.y/32);
    var draw_length = parseInt( (this.parentNode.rightNode.centerPoint.x - this.parentNode.leftNode.centerPoint.x) /32);
    var draw_height = parseInt( (this.parentNode.rightNode.centerPoint.y - this.parentNode.leftNode.centerPoint.y) /32);


    if(draw_height <= 1){
      draw_height = 1;
    }
    if(draw_length <= 1){
      draw_length = 1;
    }

    draw_bridge(draw_startRow, draw_startColumn, draw_length, draw_height);




    // stroke(road_color);
    // strokeWeight(road_stroke);

    // line(this.parentNode.leftNode.centerPoint.x,
    //   this.parentNode.leftNode.centerPoint.y,
    //   this.parentNode.rightNode.centerPoint.x,
    //   this.parentNode.rightNode.centerPoint.y);
  


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


    //simple math to round the numbers down to the number that can be divided by 32
    roomW_fixed = parseInt(roomW);
    roomH_fixed = parseInt(roomH);

    if(roomW_fixed % 32 != 0){
      roomW_fixed = roomW_fixed - (roomW_fixed % 32);
    }

    if(roomH_fixed % 32 != 0){
      roomH_fixed = roomH_fixed + 32 - (roomH_fixed % 32);
    }
    
    roomW = roomW_fixed;
    roomH = roomH_fixed;
    tiled_W = roomW / 32;
    tiled_H = roomH / 32;
    //math end

    var x = random(this.startPoint.x, this.endPoint.x - roomW);
    var y = random(this.startPoint.y, this.endPoint.y - roomH);

    //simple math to round room W&H down to the number that can be divided by 32
    x_fixed = parseInt(x);
    y_fixed = parseInt(y);

    if(x_fixed % 32 != 0){
      x_fixed = x_fixed - (x_fixed % 32);
    }

    if(y_fixed % 32 != 0){
      y_fixed = y_fixed + 32 - (y_fixed % 32);
    }
    
    x = x_fixed;
    y = y_fixed;
    //math end
 

    //add data into rooms array
    rooms.push(new array_addRoom(room_ID, x, y, roomW, roomH));
    room_ID++;
    
    rectMode(CORNER);
    noStroke();
    fill(room_color);
    rect(x, y, roomW, roomH);
  }
}


//warning the following helper function shouldn't be changed
//------------------------------------------------------------------------------------
//------------------------------Helper function for BSP-------------------------------


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
//------------------------------Helper function END-------------------------------
//------------------------------------------------------------------------------------
