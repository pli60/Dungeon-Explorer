//=============================================================
//========================Background===========================

// function that preload the background
function Background_preload() {
    bg1 = loadImage('assets/Background1.png');
    bg2 = loadImage('assets/Background2.png');
    bg3 = loadImage('assets/Background3.png');
    bg4 = loadImage('assets/Background4.png');
    bg5 = loadImage('assets/Background5.png');
}


function Background_setup() {
    let backg = [bg1, bg2, bg3, bg4, bg5];
    bg = random(backg);
    background(bg);
}

//====================Background End===========================
//=============================================================




//=============================================================
//===========================Tile==============================

// function preload every tile
function Tile_preload() {
    tile_water = loadImage('./assets/Water.png');
    tile_grass = loadImage('./assets/Grass.png');
    tile_road = loadImage('./assets/Road.png');
    tile_flower = loadImage('./assets/Flower2.png');
    tile_rock = loadImage('./assets/Rock2.png');

    //tile_wall = loadImage('./assets/Wall.png');
}


// helper function used in Tile_generator
//       that draw a tile
function Tile_drawATile(tileType, roomID, row, column, layer0, layer1, layer2) {
    //draw layer0 if the tile hasn't been used yet
    image(tileType, column * tilesize, row * tilesize);
    //make two-d array 
    rooms[roomID].tiles[row][column] = new array_addTile(row, column, layer0, layer1, layer2);
    // console.log("room: " + rooms[roomID].room_ID + " row: " + rooms[roomID].tiles[row][column].tile_row + " column: " + rooms[roomID].tiles[row][column].tile_column
    // + " type: " + rooms[roomID].tiles[row][column].layer_0);
}


// function that make tilesmap
function Tile_generator() {


    this.distance_row_to_topEdge = 0;
    this.distance_row_to_bottomEdge = 0;
    this.distance_column_to_leftEdge = 0;
    this.distance_column_to_rightEdge = 0;



    //for loop will setup array for drawing
    //  crop the room into 32*32 tiles and store their information into array
    //  draw the basic inner contents (the edge will be drawed over this layer)
    for (var i = 0; i < rooms.length; i++) {


        //draw assets based on the rows and columns
        for (var row = 0; row < rooms[i].tiles_row; row++) {
            for (var column = 0; column < rooms[i].tiles_column; column++) {


                //seeds the tile generator
                noiseSeed(seeds_noise);
                //must push and pop before use translate 
                push();
                //translate the origin to start_x, start_y  (treat that point as 0, 0)
                translate(rooms[i].start_x, rooms[i].start_y);

                //detemine the how far the current tiles are from the edges
                this.distance_row_to_topEdge = row - 0;
                this.distance_row_to_bottomEdge = rooms[i].tiles_row - 1 - row;
                this.distance_column_to_leftEdge = column - 0;
                this.distance_column_to_rightEdge = rooms[i].tiles_column - 1 - column;

                //find smallest distance
                this.distanceArray = [this.distance_row_to_topEdge, this.distance_row_to_bottomEdge, this.distance_column_to_leftEdge, this.distance_column_to_rightEdge];
                this.minDistance = Math.min.apply(Math, this.distanceArray);


                //if the tile is closer to the edges, it's more likely will generate the edge
                if (this.minDistance <= 1 && this.minDistance > 0) {
                    if (noise(row, column) > 0.4) {
                        Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                    } else {
                        Tile_drawATile(tile_grass, i, row, column, tileID_Grass, tileID_None, tileID_None);
                    }
                    //only spawn water tile if it's edge
                } else if (this.minDistance == 0) {
                    Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                } else {

                    //other wise it will generate the ground 

                    if (noise(row, column) > 0.75) {
                        Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                    } else {
                        if (noise(row, column) > 0.65) {
                            Tile_drawATile(tile_flower, i, row, column, tileID_Flower, tileID_None, tileID_None);
                        }else if (noise(row, column) > 0.6) {
                            Tile_drawATile(tile_rock, i, row, column, tileID_Rock, tileID_None, tileID_None);
                        }else {
                            Tile_drawATile(tile_grass, i, row, column, tileID_Grass, tileID_None, tileID_None);
                        }
                    }

                }
                pop();
                seeds_noise += seeds_noise_increment;

            }
        }
    }


    Tile_fixer();
}


// function that contains rule that fix the tile against the logic, 
//          in other words : procedural generation 
function Tile_fixer() {

    /*
    rule #1:   the ground won't be surrounded by the water 
    */


    for (var i = 0; i < rooms.length; i++) {
        for (var row = 0; row < rooms[i].tiles_row; row++) {
            for (var column = 0; column < rooms[i].tiles_column; column++) {

                //must push and pop before use translate 
                push();
                //translate the origin to start_x, start_y  (treat that point as 0, 0)
                translate(rooms[i].start_x, rooms[i].start_y);

                //rule #1

                var waterTileCount = 0;
                var adj_row = 0;
                var adj_column = 0;
                
                if (rooms[i].tiles[row][column].layer_0 == tileID_Grass) {


                    //adj is used to check all adj tiles of the current tile
                    for (var adj = 0; adj < 4; adj++) {

                        adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                        adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;

                        if(rooms[i].tiles[adj_row][adj_column] != null){
                        if (rooms[i].tiles[adj_row][adj_column].layer_0 == tileID_Water) {
                            waterTileCount++;
                        }
                    }

                    }// //adj check end

                    if(waterTileCount == 4){
                        Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                    }
                    waterTileCount = 0;

                }//rule 1 end


                pop();


            }
        }
    }

}

//=========================Tile End============================
//=============================================================





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

//  print out data for debugging

function printRoomTileData() {
    for (var i = 0; i < rooms.length; i++) {
        console.log("ID : " + rooms[i].room_ID);

        for (var j = 0; j < rooms[i].tiles.length; j++) {
            console.log("row: " + rooms[i].tiles[j].tile_row + " column: " + rooms[i].tiles[j].tile_column);
            console.log(rooms[i].tiles[j].layer_0 + " " + rooms[i].tiles[j].layer_1 + " " + rooms[i].tiles[j].layer_2)
        }
    }
}



