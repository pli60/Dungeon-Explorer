"use strict";
/* global p5 */
/* exported preload, setup, draw, mouseClicked */

// test implementation of the dungeon creation algorithm from chapter 3.2 of:
/*
Noor Shaker, Julian Togelius, and Mark J. Nelson (2016). Procedural Content Generation in Games: A Textbook and an Overview of Current Research. Springer. ISBN 978-3-319-42714-0.

1: start with the entire dungeon area (root node of the BSP tree)
2: divide the area along a horizontal or vertical line
3: select one of the two new partition cells
4: if this cell is bigger than the minimal acceptable size:
5: go to step 2 (using this cell as the area to be divided)
6: select the other partition cell, and go to step 4
7: for every partition cell:
8: create a room within the cell by randomly choosing two points (top left and bottom right) within its boundaries
9: starting from the lowest layers, draw corridors to connect rooms corresponding to children of the same parent in the BSP tree
10:repeat 9 until the children of the root node are connected
*/

function setup() {
  // p5.js function to set up the canvas and start the dungeon creation
  createCanvas(1280, 720);
  background(0);
  
  var maxSplitLevel = 10; // max level (meaning height) of the BSP tree 
  var minSize = width/3; // low value results in many rooms
  
  var dungeon = generateDungeon(maxSplitLevel, minSize); // start dungeon generation
  rectMode(CORNERS);
  dungeon.drawBorders(); // draws the dividing lines
  
  dungeon.connectRooms(); // draws lines to connect rooms
  dungeon.generateRoom(); // generates and draws the rooms
  
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
  
  var dungeon = new BSPNode(null, startPoint, endPoint); // initialize dungeon
 
  dungeon.splitAll(minRoomSize, maxSplitLevel, 0); // start spliting process
  
  return dungeon;
}

function BSPNode(parentNode, startPoint, endPoint) {
  // constructer of a single node of the binary space partition tree
  this.parentNode = parentNode;
  this.startPoint = startPoint;
  this.endPoint = endPoint;
  this.level = 0;
  this.leftNode = null;
  this.rightNode = null;
  var centerX = this.startPoint.x + (this.endPoint.x - this.startPoint.x)/2;
  var centerY = this.startPoint.y + (this.endPoint.y - this.startPoint.y)/2;
  this.centerPoint = {
    x:centerX,
    y:centerY
  };
  //print("center: " + this.centerPoint.x.toFixed() + ", " + this.centerPoint.y.toFixed());
}

BSPNode.prototype.connectRooms = function() {
  // connect the rooms of the same parent
  // this is not the method given in the algorithm and only connects the centers of the nodes...
  if(this.rightNode) { this.rightNode.connectRooms(); }
  if(this.leftNode) { this.leftNode.connectRooms(); }
  
  stroke(150);
  strokeWeight(50);
  if(this.parentNode) {
    line(this.parentNode.leftNode.centerPoint.x,
         this.parentNode.leftNode.centerPoint.y,
         this.parentNode.rightNode.centerPoint.x,
         this.parentNode.rightNode.centerPoint.y);
  } 
}

BSPNode.prototype.generateRoom = function() {
  // generate rooms in the leaves of the BSP tree
  if(this.leftNode && this.rightNode) {
    // this nodes is not a leave
    this.rightNode.generateRoom();
    this.leftNode.generateRoom();
  } else {
    // this node is a leave, thus create a room
    //print("level: " + this.level);
    var dx = this.endPoint.x - this.startPoint.x;
    var dy = this.endPoint.y - this.startPoint.y;
    //print("dx, dy: " + dx.toFixed() + ", " + dy.toFixed());
    var roomW = dx - random(dx/8, dx/2); // arbitrary
    var roomH = dy - random(dy/8, dy/2); // arbitrary

    var x = random(this.startPoint.x, this.endPoint.x - roomW);
    var y = random(this.startPoint.y, this.endPoint.y - roomH);

    rectMode(CORNER);
    noStroke();
    fill(150);
    rect(x, y, roomW, roomH);
    ellipseMode(CORNER);
    fill("red");
    ellipse(x + roomW/4, y + roomH/4, roomW/2, roomH/2);
    
    // save room specs (not yet used for anything :P)
    this.roomX = x;
    this.roomY = y;
    this.roomW = roomW;
    this.roomH = roomH;
  }
}

BSPNode.prototype.drawBorders = function() {
  // draws the borders between nodes
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
  // recursively call for other nodes
  if(this.leftNode) {
    this.leftNode.drawBorders();
  }
  if(this.rightNode) {
    this.rightNode.drawBorders();
  }
}

BSPNode.prototype.splitAll = function(minRoomSize, maxSplitLevel, level) {
  // recursively splits the nodes if conditions are met
  this.level = level;
  //print("START: x: " + this.startPoint.x.toFixed() + ", y: " + this.startPoint.y.toFixed() + " END: x: " + this.endPoint.x.toFixed() + ", y: " + this.endPoint.y.toFixed());
  var splitting = this.splitable(minRoomSize);
  if(splitting !== 0) { // 0 means no split
    level++;
    // choose random split point; minRoomsize/2 is arbitrary
    var splitX = random(this.startPoint.x + minRoomSize/2,
                   this.endPoint.x - minRoomSize/2);
    var splitY = random(this.startPoint.y + minRoomSize/2,
                   this.endPoint.y - minRoomSize/2);
    var p = {
      x:splitX,
      y:splitY
    };

    if(splitting === 1) { // horizontal
      this.splitUp(p, 0);
    } else if (splitting === 2) { // vertical
      this.splitUp(p, 1);
    }
    
    // recursive call if level is low enough
    if(level < maxSplitLevel) {
      this.leftNode.splitAll(minRoomSize, maxSplitLevel, level);
      this.rightNode.splitAll(minRoomSize, maxSplitLevel, level);
    }
    
  }
}

BSPNode.prototype.splitUp = function(splitPoint, axis) {
  // splits node at splitPoint along the given axis
  if(splitPoint.x < this.startPoint.x || splitPoint.x > this.endPoint.x) {
    print("failure: splitting-point not inside this node");
  } else if(splitPoint.y < this.startPoint.y || splitPoint.y > this.endPoint.y) {
    print("failure: splitting-point not inside this node");
  } else {
    
    var leftStart, leftEnd, rightStart, rightEnd;
    
    switch(axis) {
      case 0: // horizontal
        leftStart = this.startPoint;
        leftEnd = {
          x:this.endPoint.x,
          y:splitPoint.y
        };
        rightStart = {
          x:this.startPoint.x,
          y:splitPoint.y
        };
        rightEnd = this.endPoint;
        break;
        
      case 1: // vertical
        leftStart = this.startPoint;
        leftEnd = {
          x:splitPoint.x,
          y:this.endPoint.y
        };
        rightStart = {
          x:splitPoint.x,
          y:this.startPoint.y
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

BSPNode.prototype.splitable = function(minRoomSize) {
  // 0 -> no splitting, 1 -> horizontal, 2 -> vertical, 3 -> both
  if(this.leftNode || this.rightNode) { // already split nodes are ignored
    return 0;
  }
  var dx = this.endPoint.x - this.startPoint.x;
  var dy = this.endPoint.y - this.startPoint.y;
  //print("dx: " + dx.toFixed() + ", dy: " + dy.toFixed());
  
  if(dx < minRoomSize) {
    if(dy < minRoomSize) {
      return 0; // no split
    } else {
      return 1; // horizontal
    }
  } else {
    if(dy < minRoomSize) {
      return 2; // vertical
    } else {
      var coin = random(1); // "coin toss" to decide which split-direction
      if(coin <= 0.5) { // horizontal
        return 1;
      } else { // vertical
        return 2;
      }
    }
  }
}