

//----------------------Objects--------------------------------
//-------------------------------------------------------------
//object that contains the  information of seagull
/*    current location, XY
      speed_x ,y means how much it will move (change) in x, y
*/

class array_addSeagull {
  constructor(animation, location_X, location_Y, speed_X, speed_Y) {
    this.location_X = location_X;
    this.location_Y = location_Y;
    this.start_X = location_X;
    this.start_Y = location_Y;
    this.speed_multiplier = randomGaussian(1, 0.4);
    this.speed_X = speed_X * this.speed_multiplier;
    this.speed_Y = speed_Y * this.speed_multiplier;
    this.speed = sqrt(sq(this.speed_X) + sq(this.speed_Y));
    this.directionFlag = random(0, 2);
    if(this.directionFlag >= 1){
      this.speed_X = -this.speed_X;
      this.speed_Y = -this.speed_Y;
    }
    this.animation = animation;
    this.animation_speed = 0;

  }




  makeitMove() {

    //frame increment
    let frame_index = floor(this.animation_speed) % this.animation.length;
    image(this.animation[frame_index], this.location_X, this.location_Y);


    //this control the frame of moving animation
    //so it will be reflect to the actual speed of the seagull
    this.animation_speed += this.speed / 10;


    //moving "animation"
    this.location_X += this.speed_X;
    this.location_Y += this.speed_Y;
    this.collision();
  }


  //collision function will modify the speedxy if collision happened
  collision() {

    push();
    randomSeed(seeds_collision);

    if (this.location_X <= -boundary || this.location_X >= canvas_width + boundary ||
      this.location_Y <= -boundary || this.location_Y >= canvas_height + boundary) {

      this.speed_X = random(-this.speed, this.speed);
      var flag = random(0, 2);
      if (flag >= 1) {
        this.speed_Y = sqrt(sq(this.speed) - sq(this.speed_X));
      } else {
        this.speed_Y = -sqrt(sq(this.speed) - sq(this.speed_X));
      }



    }

    seeds_collision++;
    pop();
  }



}




//object that contains the basic information of working tile
/*    tile_row, tile_column are the position of the tiles
*/
class array_addAdjTile {
  constructor(tile_row, tile_column) {
    this.tile_row = tile_row;
    this.tile_column = tile_column;
  }
}


//object that contains the information of each tile
/*    tile_row, tile_column are the position of the tiles
      layer is the complexity of the tile, pass tileID (can be found in init.js->global->tiles)
      layer 0 is default tile type 
*/
class array_addTile {
  constructor(tile_row, tile_column, layer_0, layer_1, layer_2) {
    this.tile_row = tile_row;
    this.tile_column = tile_column;
    this.layer_0 = layer_0;
    this.layer_1 = layer_1;
    this.layer_2 = layer_2;

    this.adjTile = new Array();
    //add adjacent infor for this tile, array elements order  top = 0, down = 1, left = 2, right = 3,
    this.adjTile[0] = new array_addAdjTile(this.tile_row - 1, this.tile_column);
    this.adjTile[1] = new array_addAdjTile(this.tile_row + 1, this.tile_column);
    this.adjTile[2] = new array_addAdjTile(this.tile_row, this.tile_column - 1);
    this.adjTile[3] = new array_addAdjTile(this.tile_row, this.tile_column + 1);
  }

}


//object that contains the information of each room, for quick draw
/*    room_ID is reserved but not used, set to 0 by default
      start_x, start_y are the starting point of 
      room_width, room_height are the dimension of the room
*/
class array_addRoom {
  constructor(room_ID, start_x, start_y, room_width, room_height) {
    this.room_ID = room_ID;
    this.start_x = start_x;
    this.start_y = start_y;
    this.room_width = room_width;
    this.room_height = room_height;

    this.tiles_row = room_height / tilesize;
    this.tiles_column = room_width / tilesize;

    this.tiles = new Array(this.tiles_row);
    for (var i = 0; i < this.tiles_row; i++) {
      this.tiles[i] = new Array(this.tiles_column);
    }




  }
}


  //----------------------Objects End----------------------------
  //-------------------------------------------------------------